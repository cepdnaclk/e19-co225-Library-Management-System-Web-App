import React, { useState } from 'react';

const EmailForm = () => {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/send-email', {
                email,
                subject,
                content,
            });
            console.log(response.data);
            // Add any success handling logic
        } catch (error) {
            console.error(error);
            // Add any error handling logic
        }
    };

    return (
        <div>
            <h2>Email Form</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="subject">Subject:</label>
                <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
                <label htmlFor="content">Content:</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default EmailForm;
