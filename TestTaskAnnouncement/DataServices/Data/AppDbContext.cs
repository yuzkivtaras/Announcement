﻿using Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace DataServices.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Announcement> Announcements { get; set; }
    }
}
