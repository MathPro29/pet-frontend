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
            <div>
                <h1>API Response</h1>
                <p>Success: {apiResponse.success ? "Yes" : "No"}</p>
                <p>Message: {apiResponse.message}</p>
                <h2>Data:</h2>
                <p>
                    {apiResponse.data.name} - {apiResponse.data.species}
                </p>
            </div>
        );
    }