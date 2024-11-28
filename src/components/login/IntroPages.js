import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

const IntroPages = () => {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);

    const handleStart = () => {
        navigate('/login');
    };

    const slides = [
        {
            image: '/imagem/imagem1.png',
            text: 'Aproveite a experiência do café gourmet sem sair de casa.',
        },
        {
            image: '/imagem/imagem2.png',
            text: 'Desfrute do aroma e sabor dos cafés mais refinados sem sair de casa.',
        },
        {
            image: '/imagem/imagem3.png',
            text: 'Seu café favorito, entregue com amor e frescor.',
        },
    ];

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Swiper
                pagination={{ clickable: true }}
                modules={[Pagination]}
                style={{ width: '100%', height: '70%' }}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // Atualiza o índice do slide ativo
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%">
                            <img src={slide.image} alt="Café" style={{ width: '150px', marginBottom: '20px' }} />
                            <Typography
                                variant="body1"
                                sx={{
                                    color: '#BF7373',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    padding: '0 20px',
                                    marginBottom: '20px', // Garantir espaçamento entre a descrição e o botão
                                }}
                            >
                                {slide.text}
                            </Typography>
                            {/* O botão "Começar" só será exibido no último slide */}
                            {activeIndex === slides.length - 1 && (
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#BF7373',
                                        color: '#FFF',
                                        fontWeight: 'bold',
                                        borderRadius: '8px',
                                        width: '80%', // Ajusta o tamanho do botão
                                        maxWidth: '400px', // Limita a largura máxima
                                    }}
                                    onClick={handleStart}
                                >
                                    Começar
                                </Button>
                            )}
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
};

export default IntroPages;
