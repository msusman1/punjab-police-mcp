'use client'

import React, {useState, useEffect} from 'react';

// Assuming you have this interface defined elsewhere, e.g., in types.ts
interface Service {
    title: string;
    description: string;
}

export default function Services() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // Type error state

    useEffect(() => {
        async function fetchServices() {
            try {
                const response = await fetch('/api/services');
                if (!response.ok) {
                    new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setServices(data);
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError('An unknown error occurred.');
                }
            } finally {
                setLoading(false);
            }
        }

        fetchServices();
    }, []);

    // --- UI Improvements below ---

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.loadingCard}>
                    <p style={styles.loadingText}>Loading services overview... ⏳</p>
                    {/* Optional: Add a simple spinner */}
                    <div style={styles.spinner}></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.container}>
                <div style={styles.errorCard}>
                    <h2 style={styles.errorTitle}>Oops! Something went wrong.</h2>
                    <p style={styles.errorMessage}>Error loading services: {error}</p>
                    <p style={styles.errorHint}>Please try refreshing the page or contact support if the issue
                        persists.</p>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.mainTitle}>Punjab Police Services Overview 🚔</h1>

            {services.length > 0 ? (
                <div style={styles.gridContainer}>
                    {services.map((service, index) => (
                        <div key={index} style={styles.serviceCard}>
                            <h2 style={styles.serviceTitle}>{service.title}</h2>
                            <p style={styles.serviceDescription}>{service.description}</p>
                            {/* You could add a "Read More" link here if descriptions are long */}
                            {/* <a href="#" style={styles.readMoreLink}>Read More &rarr;</a> */}
                        </div>
                    ))}
                </div>
            ) : (
                <div style={styles.noServicesCard}>
                    <p style={styles.noServicesText}>
                        No services found or unable to scrape. <br/>
                        Please ensure the target website URL and selectors in your API are correct.
                    </p>
                </div>
            )}
        </div>
    );
}

// Basic Inline Styles (consider moving to CSS Modules or a global CSS file)
const styles: { [key: string]: React.CSSProperties } = {
    container: {
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        maxWidth: '1200px',
        margin: '20px auto',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        textAlign: 'center',
    },
    mainTitle: {
        fontSize: '2.5em',
        color: '#2c3e50',
        marginBottom: '30px',
        fontWeight: 'bold',
        textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
    },
    loadingCard: {
        backgroundColor: '#e0f7fa',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
    },
    loadingText: {
        fontSize: '1.5em',
        color: '#007bff',
        marginBottom: '20px',
        fontWeight: 'bold',
    },
    spinner: {
        border: '4px solid rgba(0, 0, 0, 0.1)',
        borderLeftColor: '#007bff',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        animation: 'spin 1s linear infinite',
        // Keyframes for spinner animation (would typically be in global CSS)
        // You'd need to add this to a CSS file:
        // @keyframes spin {
        //     0% { transform: rotate(0deg); }
        //     100% { transform: rotate(360deg); }
        // }
    },
    errorCard: {
        backgroundColor: '#ffebee',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        textAlign: 'center',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorTitle: {
        fontSize: '1.8em',
        color: '#d32f2f',
        marginBottom: '10px',
        fontWeight: 'bold',
    },
    errorMessage: {
        fontSize: '1.2em',
        color: '#c62828',
        marginBottom: '15px',
    },
    errorHint: {
        fontSize: '0.9em',
        color: '#7f8c8d',
    },
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', // Responsive grid
        gap: '25px',
        padding: '10px',
    },
    serviceCard: {
        backgroundColor: '#ffffff',
        border: '1px solid #e0e0e0',
        borderRadius: '10px',
        padding: '25px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start', // Align content to the start
        textAlign: 'left', // Align text to the left
    },
    serviceCardHover: {
        transform: 'translateY(-5px)',
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
    },
    serviceTitle: {
        fontSize: '1.6em',
        color: '#34495e',
        marginBottom: '10px',
        fontWeight: '600',
    },
    serviceDescription: {
        fontSize: '1em',
        color: '#555',
        lineHeight: '1.6',
        flexGrow: 1, // Allow description to take up available space
    },
    readMoreLink: {
        marginTop: '15px',
        color: '#007bff',
        textDecoration: 'none',
        fontWeight: 'bold',
        alignSelf: 'flex-end', // Align link to the bottom right
    },
    noServicesCard: {
        backgroundColor: '#fff3cd',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        textAlign: 'center',
        color: '#856404',
        minHeight: '150px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    noServicesText: {
        fontSize: '1.2em',
        lineHeight: '1.5',
    }
};