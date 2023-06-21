CREATE DATABASE AnnouncementData;
GO

USE AnnouncementData;
GO

CREATE TABLE Announcements (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX) NOT NULL,
    Created DATETIME NOT NULL
);
GO

INSERT INTO Announcements (Title, Description, Created)
VALUES
    ('Test Announcement 1', 'Description 1', '2023-06-01 10:00:00'),
    ('Test Announcement 2', 'Description 2', '2023-06-02 14:30:00'),
    ('Test Announcement 3', 'Description 3', '2023-06-03 09:15:00'),
    ('Hello World 4', 'Hi', '2023-06-04 12:45:00'),
    ('NewAnnouncement 5', 'Aaaaaaaa 5', '2023-06-05 16:20:00');
GO
