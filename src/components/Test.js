
import React, { useState } from 'react';
import axios from 'axios';

import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

const Test = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const API_KEY = 'YOUR_API_KEY';
    const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const searchMovies = async () => {
        try {
            const response = await axios.get(BASE_URL, {
                params: {
                    api_key: API_KEY,
                    query: query,
                },
            });
            setMovies(response.data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    

    return (
        <Container style={{ backgroundColor: '#f8f9fa', paddingTop: '20px', paddingBottom: '20px' }}>
            <Row className="mt-4">
                <Col xs={12} md={6} lg={4}>
                    <Form>
                        <Form.Group controlId="movieSearchInput">
                            <Form.Control
                                type="text"
                                placeholder="Search for a movie..."
                                value={query}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Col>
                <Col xs={12} md={6} lg={2}>
                    <Button variant="primary" onClick={searchMovies} block>
                        Search
                    </Button>
                </Col>
            </Row>
            <Row className="mt-4">
                {movies.map((movie) => (
                    <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
                        <Card className="mb-3 h-100">
                            <Card.Img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
                            <Card.Body>
                                <Card.Title>{movie.title}</Card.Title>
                                <Card.Text>
                                    <strong>Release Date:</strong> {movie.release_date}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Rating:</strong> {movie.vote_average}
                                </Card.Text>
                                <Card.Text>{movie.overview}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );

};




export default Test;
