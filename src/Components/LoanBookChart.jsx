import React, { useEffect, useState } from 'react';
import { BarChart, axisClasses } from '@mui/x-charts';
import { Button, ButtonGroup, Box, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAnalytics } from '../Api/Apis';

export default function LoanBookChart() {
    const [data, setData] = useState({ yearly: [], monthly: [] });
    const [chartType, setChartType] = useState('monthly'); // 'monthly' or 'yearly'
    const loading = useSelector(state => state.loading);
    const analytics = useSelector(state => state.analytics);
    const dispatch = useDispatch();
    const theme = useTheme();

    const fetchData = async () => {
        const response = await getAnalytics(dispatch);
        const { yearlyData, monthlyData } = response.data;
        setData({ yearly: yearlyData, monthly: monthlyData });
    };

    useEffect(() => {
        if (!analytics) {
            fetchData();
        } else {
            const { yearlyData, monthlyData } = analytics;
            setData({ yearly: yearlyData, monthly: monthlyData });
        }
    }, [analytics]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const createChartData = (data, type) => {
        if (type === 'yearly') {
            // Only keep the last 7 years of data
            const currentYear = new Date().getFullYear();
            return data.filter(item => item._id.year >= currentYear - 7)
                .map(item => ({ time: item._id.year, amount: item.totalLoanTakenAmount }));
        }
        return data.map(item => ({
            time: `${item.year}-${item.month}`,
            amount: item.totalLoanTakenAmount
        }));
    };

    const chartData = createChartData(data[chartType], chartType);

    return (
        <React.Fragment>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: 'center' }}>
                    <lord-icon
                        src="https://cdn.lordicon.com/ofcynlwa.json"
                        trigger="hover"
                        style={{ width: '24px', height: '24px', marginRight: '8px' }}
                    />
                    <Typography variant="h5" component="h2" gutterBottom>
                        Loan Book Data
                    </Typography>
                </Box>
                <ButtonGroup
                    variant="contained"
                    aria-label="outlined primary button group"
                    sx={{ mb: 2 }}
                >
                    <Button
                        onClick={() => setChartType('monthly')}
                        sx={{
                            textTransform: 'none',
                            fontSize: '0.75rem',
                            borderRadius: '8px',
                            bgcolor: chartType === 'monthly' ? theme.palette.primary.main : theme.palette.grey[300],
                            color: chartType === 'monthly' ? 'white' : theme.palette.text.primary,
                            '&:hover': {
                                bgcolor: chartType === 'monthly' ? theme.palette.primary.dark : theme.palette.grey[400]
                            }
                        }}
                    >
                        Monthly
                    </Button>
                    <Button
                        onClick={() => setChartType('yearly')}
                        sx={{
                            textTransform: 'none',
                            fontSize: '0.75rem',
                            borderRadius: '8px',
                            bgcolor: chartType === 'yearly' ? theme.palette.primary.main : theme.palette.grey[300],
                            color: chartType === 'yearly' ? 'white' : theme.palette.text.primary,
                            '&:hover': {
                                bgcolor: chartType === 'yearly' ? theme.palette.primary.dark : theme.palette.grey[400]
                            }
                        }}
                    >
                        Yearly
                    </Button>
                </ButtonGroup>
            </Box>
            <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden', padding: '16px', background: theme.palette.background.paper, borderRadius: '8px', boxShadow: theme.shadows[3] }}>
                <BarChart
                    dataset={chartData}
                    margin={{
                        top: 5,
                        right: 20,
                        left: 50,
                        bottom: 30,
                    }}
                    xAxis={[
                        { scaleType: 'band', dataKey: 'time', tickPlacement: 'middle', tickLabelPlacement: 'middle', tickLabelStyle: theme.typography.body2 }
                    ]}
                    yAxis={[
                        {  labelStyle: theme.typography.body1, tickLabelStyle: theme.typography.body2 }
                    ]}
                    series={[
                        { dataKey: 'amount', color: theme.palette.primary.main }
                    ]}
                    height={300}
                    sx={{
                        [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
                        [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
                        [`& .${axisClasses.left} .${axisClasses.label}`]: {
                            transform: 'translateX(-10px)',
                        },
                        [`& .${axisClasses.bottom} .${axisClasses.label}`]: {
                            transform: 'translateY(10px)',
                        },
                    }}
                />
            </div>
        </React.Fragment>
    );
}
