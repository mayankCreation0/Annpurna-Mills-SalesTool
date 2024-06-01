import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { motion, useAnimation } from 'framer-motion';

const StatBox = ({ title, value, growth }) => {
    const controls = useAnimation();
    const [displayValue, setDisplayValue] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (value !== undefined) {
            setLoading(false);
            controls.start({
                displayValue: value,
                transition: { duration: 2, ease: "easeOut" }
            });

            const interval = setInterval(() => {
                setDisplayValue(Math.floor(Math.random() * value));
            }, 50);

            setTimeout(() => {
                clearInterval(interval);
                setDisplayValue(value);
            }, 2000);
        }
    }, [value, controls]);

    return (
        <Paper
            component={motion.div}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{
                padding: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'applicationTheme.primaryColor_1',
                color: 'applicationTheme.secondary',
                width: '100%',
                borderRadius: 2,
                boxShadow: 5,
                minWidth: 300,
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 1 }}>{title}</Typography>
            {loading ? (
                <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: 1 }}>Loading...</Typography>
            ) : (
                <motion.div
                    initial={{ displayValue: 0 }}
                    animate={controls}
                >
                    <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: 1 }}>{displayValue}</Typography>
                </motion.div>
            )}
            <Box sx={{ display: 'flex', alignItems: 'center', color: growth >= 0 ? 'success.main' : 'error.main' }}>
                {growth >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                <Typography variant="body1" sx={{ marginLeft: 1 }}>
                    {growth >= 0 ? '+' : ''}
                    {growth}% from last month
                </Typography>
            </Box>
        </Paper>
    );
};

const Statistics = () => {
    const data = useSelector((state) => state.analytics);
    const { currentMonth, previousMonth, currentMonthLoanRepaidStats, previousMonthLoanRepaidStats } = data;

    const calculateGrowth = (current, previous) => {
        return ((current - previous) / (previous || 1) * 100).toFixed(1);
    };

    const totalLoanRepaidAmountGrowth = calculateGrowth(currentMonthLoanRepaidStats.totalLoanRepaidAmount, previousMonthLoanRepaidStats.totalLoanRepaidAmount);
    const customerCountGrowth = calculateGrowth(currentMonth.customerCount, previousMonth.customerCount);
    const totalLoanTakenAmountGrowth = calculateGrowth(currentMonth.totalLoanTakenAmount, previousMonth.totalLoanTakenAmount);

    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            sx={{ display: 'flex', gap: 3, overflowX: 'auto', whiteSpace: 'nowrap', padding: 3 }}
        >
            <StatBox
                title="Total Loan Repaid Amount"
                value={currentMonthLoanRepaidStats?.totalLoanRepaidAmount}
                growth={totalLoanRepaidAmountGrowth}
            />
            <StatBox
                title="Customer Count"
                value={currentMonth?.customerCount}
                growth={customerCountGrowth}
            />
            <StatBox
                title="Total Loan Taken Amount"
                value={currentMonth?.totalLoanTakenAmount}
                growth={totalLoanTakenAmountGrowth}
            />
        </Box>
    );
};

export default Statistics;
