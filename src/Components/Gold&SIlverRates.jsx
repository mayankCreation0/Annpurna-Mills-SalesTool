import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchRates } from '../Api/Apis';

const GoldSilverRatesComponent = () => {
    const [gold22kRate, setGold22kRate] = useState('');
    const [gold24kRate, setGold24kRate] = useState('');
    const [silverRate, setSilverRate] = useState('');

    useEffect(() => {
        const fetchMetalRates = async () => {
            try {
                const response = await fetchRates()
                const [gold22k, gold24k] = response.data[0];
                const { price, weight } = response.data[1];

                setGold22kRate(gold22k);
                setGold24kRate(gold24k);
                setSilverRate(`${price} (${weight})`);
            } catch (error) {
                console.error('Error fetching metal rates:', error);
            }
        };

        fetchMetalRates();
    }, []);

    return (
        <marquee behavior="scroll" direction="left" style={{ fontSize: '1rem', backgroundColor: '#f4f4f4', padding: '20px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'gold', marginRight: '20px', fontSize: '1.2rem' }}>Gold 22k Rate: {gold22kRate} 1gm</span>
            <span style={{ color: 'gold', marginRight: '20px', fontSize: '1.2rem' }}>Gold 24k Rate: {gold24kRate} 1gm</span>
            <span style={{ color: 'silver', fontSize: '1.2rem' }}>Silver Rate: {silverRate}</span>
        </marquee>
    );
};

export default GoldSilverRatesComponent;
