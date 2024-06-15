import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';
import { ToggleButton, ToggleButtonGroup, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAnalytics } from '../Api/Apis';
import { motion } from 'framer-motion';

export default function Chart() {
    const theme = useTheme();
    const [data, setData] = useState({ yearly: [], monthly: [] });
    const [chartType, setChartType] = useState('yearly');

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
            const currentYear = new Date().getFullYear();
            const last7Years = Array.from({ length: 7 }, (_, i) => currentYear - i).reverse();
            const yearlyDataMap = new Map(data.yearly.map(item => [item._id.year, item.customerCount]));

            return last7Years.map(year => ({
                time: year,
                amount: yearlyDataMap.get(year) || 0,
            }));
        }
        return (data.monthly || []).map(item => ({
            time: `${item.year}-${item.month}`,
            amount: item.customerCount
        }));
    };

    const chartData = createChartData(data, chartType);

    return (
        <React.Fragment>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: 'center', mb: 2, mt: '0' }}>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: 'center' }}>
                    <lord-icon
                        src="https://cdn.lordicon.com/piolrlvu.json"
                        trigger="loop"
                        delay="1500"
                        style={{ width: '30px', height: '30px', marginRight: '3px' }}
                    />
                    <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                        Customer Count
                    </Typography>
                </Box>
                <ToggleButtonGroup
                    value={chartType}
                    exclusive
                    onChange={(e, newType) => newType && setChartType(newType)}
                    sx={{ height: '24px', mt: 1 }}
                >
                    <ToggleButton value="monthly" sx={{ textTransform: 'none', fontSize: '0.7rem', padding: '3px 8px' }}>
                        Monthly
                    </ToggleButton>
                    <ToggleButton value="yearly" sx={{ textTransform: 'none', fontSize: '0.7rem', padding: '3px 8px' }}>
                        Yearly
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                    width: '100%',
                    flexGrow: 1,
                    overflow: 'hidden',
                    padding: '6px',
                    background: theme.palette.background.paper,
                    borderRadius: '8px',
                    boxShadow: theme.shadows[3]
                }}
            >
                <LineChart
                    dataset={chartData}
                    margin={{
                        top: 5,
                        right: 20,
                        left: 25,
                        bottom: 30,
                    }}
                    xAxis={[
                        {
                            scaleType: 'point',
                            dataKey: 'time',
                            tickNumber: 7,
                            tickLabelStyle: theme.typography.body2,
                            tickLabelProps: { style: { transition: '0.3s', ':hover': { fill: theme.palette.primary.main } } }
                        },
                    ]}
                    yAxis={[
                        {
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
            </motion.div>
        </React.Fragment>
    );
}
