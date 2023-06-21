import React, { Component } from 'react';

export class AnnouncementList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            announcements: [],
            loading: true,
            editForm: {
                title: '',
                description: ''
            },
            selectedAnnouncement: null 
        };
    }

    componentDidMount() {
        this.fetchAnnouncements();
    }

    fetchAnnouncements() {
        fetch('/api/announcement')
            .then(response => response.json())
            .then(data => {
                this.setState({ announcements: data, loading: false });
            })
            .catch(error => {
                console.error('Error:', error);
                this.setState({ loading: false });
            });
    }

    handleEditAnnouncement(id) {
        const headers = {
            'Content-Type': 'application/json'
        };

        const { title, description } = this.state.editForm;

        const data = {
            title: title,
            description: description
        };

        fetch(`/api/announcement/${id}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    console.log('Announcement was edited successfully');
                    this.fetchAnnouncements();
                    this.clearEditForm();
                } else {
                    console.error('Error editing announcement');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    handleDeleteAnnouncement(id) {
        fetch(`/api/announcement/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    console.log('Announcement was deleted successfully');
                    this.fetchAnnouncements();
                } else {
                    console.error('Error deleting announcement');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState(prevState => ({
            editForm: {
                ...prevState.editForm,
                [name]: value
            }
        }));
    }

    handleSelectAnnouncement(announcement) {
        this.setState({ selectedAnnouncement: announcement });
    }

    clearEditForm() {
        this.setState({
            editForm: {
                title: '',
                description: ''
            },
            selectedAnnouncement: null
        });
    }

    render() {
        const { announcements, loading, editForm, selectedAnnouncement } = this.state;

        if (loading) {
            return <p>Loading...</p>;
        }

        return (
            <div>
                <h1>Announcement List</h1>
                {announcements.length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {announcements.map(announcement => (
                                <tr key={announcement.id}>
                                    <td>{announcement.title}</td>
                                    <td>{announcement.description}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => this.handleSelectAnnouncement(announcement)}>Edit</button>
                                        <button className="btn btn-danger" onClick={() => this.handleDeleteAnnouncement(announcement.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No announcements found.</p>
                )}

                <h2>Edit Announcement</h2>
                <form onSubmit={(event) => event.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="editTitle">Title:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="editTitle"
                            name="title"
                            value={editForm.title}
                            onChange={(event) => this.handleInputChange(event)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="editDescription">Description:</label>
                        <textarea
                            className="form-control"
                            id="editDescription"
                            name="description"
                            value={editForm.description}
                            onChange={(event) => this.handleInputChange(event)}
                        ></textarea>
                    </div>
                    <button className="btn btn-primary" onClick={() => this.handleEditAnnouncement(selectedAnnouncement.id)}>Save</button>
                </form>
            </div>
        );
    }
}
