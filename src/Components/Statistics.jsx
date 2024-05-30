import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const StatBox = ({ title, value, growth }) => (
    <Paper
        sx={{
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'applicationTheme.primaryColor_1',
            color: 'applicationTheme.secondary',
            width: '100%',
            borderRadius: 1,
            boxShadow: 3,
            minWidth: 250,
        }}
    >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>{title}</Typography>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>{value}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', color: growth >= 0 ? 'success.main' : 'error.main' }}>
            {growth >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
            <Typography variant="body1" sx={{ marginLeft: 1 }}>
                {growth >= 0 ? '+' : ''}
                {growth}% from last month
            </Typography>
        </Box>
    </Paper>
);

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
        <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', whiteSpace: 'nowrap', padding: 2 }}>
            <StatBox
                title="Total Loan Repaid Amount"
                value={`₹${currentMonthLoanRepaidStats.totalLoanRepaidAmount}`}
                growth={totalLoanRepaidAmountGrowth}
            />
            <StatBox
                title="Customer Count"
                value={currentMonth.customerCount}
                growth={customerCountGrowth}
            />
            <StatBox
                title="Total Loan Taken Amount"
                value={`₹${currentMonth.totalLoanTakenAmount}`}
                growth={totalLoanTakenAmountGrowth}
            />
        </Box>
    );
};

export default Statistics;
