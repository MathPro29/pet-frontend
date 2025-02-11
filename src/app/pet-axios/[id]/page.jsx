    "use client";

    import { useEffect, useState } from "react";
    import axios from "axios";
    import * as React from "react";

    export default function Page({ params }) {
        // https://nextjs.org/docs/messages/sync-dynamic-apis
        const { id } = React.use(params);
        // console.log(id);

        const [apiResponse, setApiResponse] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
            if (!id) return; // ป้องกันการ fetch ถ้า id ไม่มี
            // Fetch data from the API
            const fetchData = async () => {
                try {
                    // Make a GET request to the API with the id
                    const { data: responseData } = await axios.get(
                        `http://127.0.0.1:8000/api/pets/${id}`
                    );
                    // Set the API response in state.
                    // console.log(responseData);
                    setApiResponse(responseData);
                } catch (err) {
                    setError("Failed to load data");
                } finally {
                    setLoading(false);
                }
            };

            // Call the async function
            fetchData();
        }, [id]);

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;

        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <div style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', maxWidth: '400px', width: '100%' }}>
                    <h1 style={{ textAlign: 'center' }}>API Response</h1>
                    <p><strong>Success:</strong> {apiResponse.success ? "Yes" : "No"}</p>
                    <p><strong>Message:</strong> {apiResponse.message}</p>
                    <h2>Data:</h2>
                    <p><strong>Name:</strong> {apiResponse.data.name}</p>
                    <p><strong>Species:</strong> {apiResponse.data.species}</p>
                </div>
            </div>
        );
    }