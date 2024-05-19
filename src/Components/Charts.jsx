import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useDispatch, useSelector } from 'react-redux';
import { getAnalytics } from '../Helpers/apis';

export default function Chart() {
    const theme = useTheme();
    const [data, setData] = useState({ yearly: [], monthly: [] }); // Initialize with empty arrays
    const [chartType, setChartType] = useState('yearly'); // 'monthly' or 'yearly'

    const loading = useSelector(state => state.loading);
    const analytics = useSelector(state => state.analytics);
    const dispatch = useDispatch();

    const fetchData = async () => {
        const response = await getAnalytics(dispatch);
        console.log("Analytics", response.data);
        const { yearlyData, monthlyData } = response.data;
        setData({ yearly: yearlyData, monthly: monthlyData });
    };

    useEffect(() => {
        if (!analytics) {
            fetchData();
        }
        const { yearlyData, monthlyData } = analytics;
        setData({ yearly: yearlyData, monthly: monthlyData });

    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const createChartData = (data, type) => {
        if (type === 'yearly') {
            return data.yearly.map(item => ({ time: item._id.year, amount: item.count }));
        }
        return data.monthly.map(item => ({
            time: `${item._id.year}-${item._id.month}`,
            amount: item.count
        }));
    };

    const chartData = createChartData(data, chartType);

    return (
        <React.Fragment>
            <ButtonGroup
                variant="contained"
                color="primary"
                aria-label="outlined primary button group"
                sx={{ mb: 2 }}
            >
                <Button
                    onClick={() => setChartType('monthly')}
                    sx={{ textTransform: 'none', borderRadius: '8px' }}
                >
                    Monthly
                </Button>
                <Button
                    onClick={() => setChartType('yearly')}
                    sx={{ textTransform: 'none', borderRadius: '8px' }}
                >
                    Yearly
                </Button>
            </ButtonGroup>
            <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden', padding: '16px', background: theme.palette.background.paper, borderRadius: '8px' }}>
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
