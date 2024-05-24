import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { getAnalytics } from '../Api/Apis';
import { Box } from '@mui/material';

export default function Chart() {
    const theme = useTheme();
    const [data, setData] = useState({ yearly: [], monthly: [] });
    const [chartType, setChartType] = useState('yearly'); // 'monthly' or 'yearly'

    const loading = useSelector(state => state.loading);
    const analytics = useSelector(state => state.analytics);
    const dispatch = useDispatch();

    const fetchData = async () => {
        const response = await getAnalytics(dispatch);
        const { yearlyData, monthlyData } = response.data;
        setData({ yearly: yearlyData, monthly: monthlyData });
    };

    useEffect(() => {
        if (!analytics) {
            fetchData();
        } else {
            const { yearlyData, monthlyData } = analytics || {};
            setData({ yearly: yearlyData || [], monthly: monthlyData || [] });
        }
    }, [analytics]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const createChartData = (data, type) => {
        if (type === 'yearly') {
            return (data.yearly || []).map(item => ({ time: item._id.year, amount: item.customerCount }));
        }
        return (data.monthly || []).map(item => ({
            time: `${item.year}-${item.month}`,
            amount: item.customerCount
        }));
    };

    const chartData = createChartData(data, chartType);

    return (
        <React.Fragment>
            <Box sx={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
                    Customer Counts Data
                </Typography>
                <ButtonGroup
                    variant="contained"
                    aria-label="outlined primary button group"
                    sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}
                >
                    <Button
                        onClick={() => setChartType('monthly')}
                        sx={{
                            textTransform: 'none',
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
                <LineChart
                    dataset={chartData}
                    margin={{
                        top: 16,
                        right: 20,
                        left: 70,
                        bottom: 30,
                    }}
                    xAxis={[
                        {
                            scaleType: 'point',
                            dataKey: 'time',
                            tickNumber: 5,
                            tickLabelStyle: theme.typography.body2,
                        },
                    ]}
                    yAxis={[
                        {
                            label: 'Customer Count',
                            labelStyle: {
                                ...theme.typography.body1,
                                fill: theme.palette.text.primary,
                            },
                            tickLabelStyle: theme.typography.body2,
                            tickNumber: 5,
                        },
                    ]}
                    series={[
                        {
                            dataKey: 'amount',
                            showMark: false,
                            color: theme.palette.primary.light,
                        },
                    ]}
                    sx={{
                        [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
                        [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
                        [`& .${axisClasses.left} .${axisClasses.label}`]: {
                            transform: 'translateX(-25px)',
                        },
                    }}
                />
            </div>
        </React.Fragment>
    );
}
