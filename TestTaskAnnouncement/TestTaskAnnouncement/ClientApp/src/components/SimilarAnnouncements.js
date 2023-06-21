import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const SimilarAnnouncements = () => {
    const [similarAnnouncements, setSimilarAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSimilarAnnouncements();
    }, []);

    const fetchSimilarAnnouncements = async () => {
        try {
            const response = await fetch('/api/announcement/similar');
            const data = await response.json();
            setSimilarAnnouncements(
                data.map((announcement) => ({
                    ...announcement,
                    createdAt: dayjs(announcement.createdAt).toDate(),
                }))
            );
            setLoading(false);
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Similar Announcements</h1>
            {similarAnnouncements.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {similarAnnouncements.map((announcement) => (
                            <tr key={announcement.id}>
                                <td>{announcement.title}</td>
                                <td>{announcement.description}</td>
                                <td>{announcement.createdAt.toISOString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No similar announcements found.</p>
            )}
        </div>
    );
};

export default SimilarAnnouncements;
