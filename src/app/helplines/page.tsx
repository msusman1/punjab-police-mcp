'use client'
import React, {useState, useEffect} from 'react';

interface Helpline {
    name: string;
    phone_number: string;
}

export default function Helplines() {
    const [helplineNumbers, setHelplineNumbers] = useState<Helpline[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // Type error state

    useEffect(() => {
        async function fetchHelplines() {
            try {
                const response = await fetch('/api/helplines');
                if (!response.ok) {
                    new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setHelplineNumbers(data);
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

        fetchHelplines();
    }, []);


    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.loadingCard}>
                    <p style={styles.loadingText}>Loading Punjab Police helpline numbers... 📞⏳</p>
                    <div style={styles.spinner}></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.container}>
                <div style={styles.errorCard}>
                    <h2 style={styles.errorTitle}>Oops! Could not fetch helplines.</h2>
                    <p style={styles.errorMessage}>Error: {error}</p>
                    <p style={styles.errorHint}>Please ensure your internet connection is stable or try again later.</p>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.mainTitle}>Punjab Police Helpline Numbers 🚨</h1>

            {helplineNumbers.length > 0 ? (
                <div style={styles.gridContainer}>
                    {helplineNumbers.map((line, index) => (
                        <div key={index} style={styles.helplineCard}>
                            <h2 style={styles.helplineName}>{line.name}</h2>
                            <a href={`tel:${line.phone_number}`} style={styles.phoneNumberLink}>
                                <span style={styles.phoneIcon}>📞</span> {line.phone_number}
                            </a>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={styles.noHelplinesCard}>
                    <p style={styles.noHelplinesText}>
                        No helpline numbers found. <br/>
                        This might be a temporary issue or no helplines are available at this moment.
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
        maxWidth: '900px', // Slightly narrower for helpline numbers
        margin: '20px auto',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        textAlign: 'center',
    },
    mainTitle: {
        fontSize: '2.2em',
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
        minHeight: '150px',
    },
    loadingText: {
        fontSize: '1.3em',
        color: '#007bff',
        marginBottom: '15px',
        fontWeight: 'bold',
    },
    spinner: {
        border: '4px solid rgba(0, 0, 0, 0.1)',
        borderLeftColor: '#007bff',
        borderRadius: '50%',
        width: '30px',
        height: '30px',
        animation: 'spin 1s linear infinite',
    },
    errorCard: {
        backgroundColor: '#ffebee',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        textAlign: 'center',
        minHeight: '150px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorTitle: {
        fontSize: '1.6em',
        color: '#d32f2f',
        marginBottom: '10px',
        fontWeight: 'bold',
    },
    errorMessage: {
        fontSize: '1.1em',
        color: '#c62828',
        marginBottom: '10px',
    },
    errorHint: {
        fontSize: '0.8em',
        color: '#7f8c8d',
    },
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', // Responsive grid for helplines
        gap: '20px',
        padding: '10px',
    },
    helplineCard: {
        backgroundColor: '#ffffff',
        border: '1px solid #e0e0e0',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center content within the card
        justifyContent: 'space-between', // Distribute space between name and number
        minHeight: '100px', // Ensure consistent height
    },
    helplineCardHover: {
        transform: 'translateY(-5px)',
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
    },
    helplineName: {
        fontSize: '1.4em',
        color: '#34495e',
        marginBottom: '10px',
        fontWeight: '600',
        textAlign: 'center',
    },
    phoneNumberLink: {
        fontSize: '1.5em',
        color: '#007bff',
        textDecoration: 'none',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '8px', // Space between icon and number
    },
    phoneIcon: {
        fontSize: '1.2em', // Size of the phone icon
    },
    noHelplinesCard: {
        backgroundColor: '#fff3cd',
        padding: '25px',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        textAlign: 'center',
        color: '#856404',
        minHeight: '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    noHelplinesText: {
        fontSize: '1.1em',
        lineHeight: '1.4',
    }
};