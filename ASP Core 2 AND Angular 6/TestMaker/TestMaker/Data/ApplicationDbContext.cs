﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TestMaker.Data.Models;

namespace TestMaker.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {

        #region Constructor
        public ApplicationDbContext()
        {

        }
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }
        #endregion

        #region Properties

        //commented out as we inherit it from IdentityDbContext
        //public DbSet<ApplicationUser> Users
        //{
        //    get; set;
        //}

        public DbSet<Quiz> Quizzes
        {
            get; set;
        }
        public DbSet<Question> Questions
        {
            get; set;
        }
        public DbSet<Answer> Answers
        {
            get; set;
        }
        public DbSet<Result> Results
        {
            get; set;
        }

        #endregion

        #region Methods

        protected override void OnModelCreating(ModelBuilder
          modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ApplicationUser>().ToTable("Users");
            modelBuilder.Entity<ApplicationUser>().HasMany(u =>
             u.Quizzes).WithOne(i => i.User);

            modelBuilder.Entity<Quiz>().ToTable("Quizzes");
            modelBuilder.Entity<Quiz>().Property(i =>
                i.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Quiz>().HasOne(i => i.User).WithMany(u
               => u.Quizzes);
            modelBuilder.Entity<Quiz>().HasMany(i =>
                  i.Questions).WithOne(c => c.Quiz);

            modelBuilder.Entity<Question>().ToTable("Questions");
            modelBuilder.Entity<Question>().Property(i =>
                  i.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Question>().HasOne(i =>
                   i.Quiz).WithMany(u => u.Questions);
            modelBuilder.Entity<Question>().HasMany(i =>
                    i.Answers).WithOne(c => c.Question);

            modelBuilder.Entity<Answer>().ToTable("Answers");
            modelBuilder.Entity<Answer>().Property(i =>
                 i.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Answer>().HasOne(i =>
                 i.Question).WithMany(u => u.Answers);

            modelBuilder.Entity<Result>().ToTable("Results");
            modelBuilder.Entity<Result>().Property(i =>
                i.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Result>().HasOne(i =>
                i.Quiz).WithMany(u => u.Results);
        }

        #endregion

    }
}
