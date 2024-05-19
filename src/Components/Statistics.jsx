// Statistics.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const StatBox = ({ title, value, growth }) => (
    <Paper
        sx={{
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'primary.light',
            width: '100%',
        }}
    >
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
        <Typography color={growth >= 0 ? 'success.main' : 'error.main'}>
            {growth >= 0 ? '+' : ''}
            {growth}% from last month
        </Typography>
    </Paper>
);

const Statistics = () => {
    const data = useSelector((state) => state.analytics);

    const { currentMonth, previousMonth } = data;

    const calculateGrowth = (current, previous) => {
        return ((current - previous) / (previous || 1) * 100).toFixed(1);
    };

    const totalLoanPaidAmountGrowth = calculateGrowth(currentMonth.totalLoanPaidAmount, previousMonth.totalLoanPaidAmount);
    const countGrowth = calculateGrowth(currentMonth.count, previousMonth.count);
    const totalAmountGrowth = calculateGrowth(currentMonth.totalAmount, previousMonth.totalAmount);

    return (
        <Box sx={{ display: 'flex', gap: 2 }}>
            <StatBox
                title="Total Loan Paid Amount"
                value={`$${currentMonth.totalLoanPaidAmount}`}
                growth={totalLoanPaidAmountGrowth}
            />
            <StatBox
                title="Count"
                value={currentMonth.count}
                growth={countGrowth}
            />
            <StatBox
                title="Total Amount"
                value={`$${currentMonth.totalAmount}`}
                growth={totalAmountGrowth}
            />
        </Box>
    );
};

export default Statistics;
