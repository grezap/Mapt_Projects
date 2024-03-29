﻿using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using TestMaker.Data.Models;

namespace TestMaker.Data
{
    public static class DbSeeder
    {

        #region Methods

        public static void Seed(ApplicationDbContext dbContext, RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager)
        {
            // Create default Users (if there are none)
            if (!dbContext.Users.Any())
                CreateUsers(dbContext, roleManager, userManager).GetAwaiter().GetResult();

            // Create default Quizzes (if there are none) together with their set of Q & A
            if (!dbContext.Quizzes.Any())
                CreateQuizzes(dbContext);
        }

        private static async Task CreateUsers(ApplicationDbContext dbContext,
            RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager)
        {
            // local variables
            DateTime createdDate = new DateTime(2016, 03, 01, 12, 30, 00);
            DateTime lastModifiedDate = DateTime.Now;

            string roleAdmin = "Administrator";
            string roleRegisteredUser = "RegisteredUser";

            //Create Roles if They do not exist
            if (!await roleManager.RoleExistsAsync(roleAdmin))
            {
                await roleManager.CreateAsync(new IdentityRole(roleAdmin));
            }

            if (!await roleManager.RoleExistsAsync(roleRegisteredUser))
            {
                await roleManager.CreateAsync(new IdentityRole(roleRegisteredUser));
            }

            await dbContext.SaveChangesAsync();

            // Create the "Admin" ApplicationUser account (if it doesn't exist already)
            var user_Admin = new ApplicationUser()
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = "Admin",
                Email = "admin@testmakerfree.com",
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate
            };

            // Insert the Admin user into the Database
            if (await userManager.FindByNameAsync(user_Admin.UserName) == null)
            {
                try
                {
                    IdentityResult identityResult = await userManager.CreateAsync(user_Admin, "1234");
                    await userManager.AddToRoleAsync(user_Admin, roleRegisteredUser);
                    await userManager.AddToRoleAsync(user_Admin, roleAdmin);
                    await dbContext.SaveChangesAsync();
                }
                catch (Exception ex)
                {

                    throw ex;
                }

                // Remove Lockout and E-Mail confirmation.
                user_Admin.EmailConfirmed = true;
                user_Admin.LockoutEnabled = false;
            }

            

            //dbContext.Users.Add(user_Admin);

#if DEBUG
            // Create some sample registered user accounts (if they don't exist already)
            var user_Ryan = new ApplicationUser()
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = "Ryan",
                Email = "ryan@testmakerfree.com",
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate
            };

            var user_Solice = new ApplicationUser()
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = "Solice",
                Email = "solice@testmakerfree.com",
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate
            };

            var user_Vodan = new ApplicationUser()
            {
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = "Vodan",
                Email = "vodan@testmakerfree.com",
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate
            };

            // Insert sample registered users into the Database
            //dbContext.Users.AddRange(user_Ryan, user_Solice, user_Vodan);
            await dbContext.SaveChangesAsync();
            // Insert sample registered users into the Database and also assign the "Registered" role to him.
            if (await userManager.FindByNameAsync(user_Ryan.UserName) == null)
            {
                await userManager.CreateAsync(user_Ryan, "1234");
                await userManager.AddToRoleAsync(user_Ryan, roleRegisteredUser);
                // Remove Lockout and E-Mail confirmation.
                user_Ryan.EmailConfirmed = true;
                user_Ryan.LockoutEnabled = false;
            }
            if (await userManager.FindByNameAsync(user_Solice.UserName) == null)
            {
                await userManager.CreateAsync(user_Solice, "1234");
                await userManager.AddToRoleAsync(user_Solice, roleRegisteredUser);
                // Remove Lockout and E-Mail confirmation.
                user_Solice.EmailConfirmed = true;
                user_Solice.LockoutEnabled = false;
            }
            if (await userManager.FindByNameAsync(user_Vodan.UserName) == null)
            {
                await userManager.CreateAsync(user_Vodan, "1234");
                await userManager.AddToRoleAsync(user_Vodan, roleRegisteredUser);
                // Remove Lockout and E-Mail confirmation.
                user_Vodan.EmailConfirmed = true;
                user_Vodan.LockoutEnabled = false;
            }

#endif
            await dbContext.SaveChangesAsync();
        }

        private static void CreateQuizzes(ApplicationDbContext dbContext)
        {
            // local variables
            DateTime createdDate = new DateTime(2016, 03, 01, 12, 30, 00);
            DateTime lastModifiedDate = DateTime.Now;

            // retrieve the admin user, which we'll use as default author.
            var authorId = dbContext.Users
                .Where(u => u.UserName == "Admin")
                .FirstOrDefault()
                .Id;

#if DEBUG
            // create 47 sample quizzes with auto-generated data
            // (including questions, answers & results)
            var num = 47;
            for (int i = 1; i <= num; i++)
            {
                CreateSampleQuiz(
                    dbContext,
                    i,
                    authorId,
                    num - i,
                    3,
                    3,
                    3,
                    createdDate.AddDays(-num));
            }
#endif

            // create 3 more quizzes with better descriptive data
            // (we'll add the questions, answers & results later on)
            EntityEntry<Quiz> e1 = dbContext.Quizzes.Add(new Quiz()
            {
                UserId = authorId,
                Title = "Are you more Light or Dark side of the Force?",
                Description = "Star Wars personality test",
                Text = @"Choose wisely you must, young padawan: " +
                        "this test will prove if your will is strong enough " +
                        "to adhere to the principles of the light side of the Force " +
                        "or if you're fated to embrace the dark side. " +
                        "No you want to become a true JEDI, you can't possibly miss this!",
                ViewCount = 2343,
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate
            });

            EntityEntry<Quiz> e2 = dbContext.Quizzes.Add(new Quiz()
            {
                UserId = authorId,
                Title = "GenX, GenY or Genz?",
                Description = "Find out what decade most represents you",
                Text = @"Do you feel confortable in your generation? " +
                        "What year should you have been born in?" +
                        "Here's a bunch of questions that will help you to find out!",
                ViewCount = 4180,
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate
            });

            EntityEntry<Quiz> e3 = dbContext.Quizzes.Add(new Quiz()
            {
                UserId = authorId,
                Title = "Which Shingeki No Kyojin character are you?",
                Description = "Attack On Titan personality test",
                Text = @"Do you relentlessly seek revenge like Eren? " +
                        "Are you willing to put your like on the stake to protect your friends like Mikasa ? " +
                        "Would you trust your fighting skills like Levi " +
                        "or rely on your strategies and tactics like Arwin? " +
                        "Unveil your true self with this Attack On Titan personality test!",
                ViewCount = 5203,
                CreatedDate = createdDate,
                LastModifiedDate = lastModifiedDate
            });

            // persist the changes on the Database
            dbContext.SaveChanges();
        }

        /// <summary>
        /// Creates a sample quiz and add it to the Database
        /// together with a sample set of questions, answers & results.
        /// </summary>
        /// <param name="userId">the author ID</param>
        /// <param name="id">the quiz ID</param>
        /// <param name="createdDate">the quiz CreatedDate</param>
        private static void CreateSampleQuiz(
            ApplicationDbContext dbContext,
            int num,
            string authorId,
            int viewCount,
            int numberOfQuestions,
            int numberOfAnswersPerQuestion,
            int numberOfResults,
            DateTime createdDate)
        {
            var quiz = new Quiz()
            {
                UserId = authorId,
                Title = String.Format("Quiz {0} Title", num),
                Description = String.Format("This is a sample description for quiz {0}.", num),
                Text = "This is a sample quiz created by the DbSeeder class for testing purposes. " +
                        "All the questions, answers & results are auto-generated as well.",
                ViewCount = viewCount,
                CreatedDate = createdDate,
                LastModifiedDate = createdDate
            };
            dbContext.Quizzes.Add(quiz);
            dbContext.SaveChanges();

            for (int i = 0; i < numberOfQuestions; i++)
            {
                var question = new Question()
                {
                    QuizId = quiz.Id,
                    Text = "This is a sample question created by the DbSeeder class for testing purposes. " +
                            "All the child answers are auto-generated as well.",
                    CreatedDate = createdDate,
                    LastModifiedDate = createdDate
                };
                dbContext.Questions.Add(question);
                dbContext.SaveChanges();

                for (int i2 = 0; i2 < numberOfAnswersPerQuestion; i2++)
                {
                    var e2 = dbContext.Answers.Add(new Answer()
                    {
                        QuestionId = question.Id,
                        Text = "This is a sample answer created by the DbSeeder class for testing purposes. ",
                        Value = i2,
                        CreatedDate = createdDate,
                        LastModifiedDate = createdDate
                    });
                }
            }

            for (int i = 0; i < numberOfResults; i++)
            {
                dbContext.Results.Add(new Result()
                {
                    QuizId = quiz.Id,
                    Text = "This is a sample result created by the DbSeeder class for testing purposes. ",
                    MinValue = 0,
                    // max value should be equal to answers number * max answer value
                    MaxValue = numberOfAnswersPerQuestion * 2,
                    CreatedDate = createdDate,
                    LastModifiedDate = createdDate
                });
            }
            dbContext.SaveChanges();
        }

        #endregion

    }
}
