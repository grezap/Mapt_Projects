using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using TestMaker.Controllers.Base;
using TestMaker.Data;
using TestMaker.Data.Models;
using TestMaker.ViewModels;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestMaker.Controllers
{

    public class QuizController : BaseApiController
    {

        #region Constructor

        public QuizController(ApplicationDbContext DbContext,RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration) : base(DbContext,roleManager,userManager,configuration) { }

        #endregion

        /// <summary> 
        /// GET: api/quiz/latest 
        /// Retrieves the {num} latest Quizzes 
        /// </summary> 
        /// <param name="num">the number of quizzes to retrieve</param> 
        /// <returns>the {num} latest Quizzes</returns>
        [HttpGet("Latest/{num:int?}")]
        public IActionResult Latest(int num = 10)
        {
            var latest = dbContext.Quizzes.OrderByDescending(q => q.CreatedDate).Take(num).ToArray();

            // output the result in JSON format 
            return new JsonResult(
                latest.Adapt<QuizViewModel[]>(),
                JsonSettings);
        }

        /// <summary>
        /// GET: api/quiz/ByTitle
        /// Retrieves the {num} Quizzes sorted by Title (A to Z)
        /// </summary>
        /// <param name="num">the number of quizzes to retrieve</param>
        /// <returns>{num} Quizzes sorted by Title</returns>
        [HttpGet("ByTitle/{num:int?}")]
        public IActionResult ByTitle(int num = 10)
        {
            //var sampleQuizzes = ((JsonResult)Latest(num)).Value
            //    as List<QuizViewModel>;

            var byTitle = dbContext.Quizzes.OrderBy(q => q.Title).Take(num).ToArray();

            return new JsonResult(
                byTitle.Adapt<QuizViewModel[]>(),
                JsonSettings);
        }

        /// <summary>
        /// GET: api/quiz/mostViewed
        /// Retrieves the {num} random Quizzes
        /// </summary>
        /// <param name="num">the number of quizzes to retrieve</param>
        /// <returns>{num} random Quizzes</returns>
        [HttpGet("Random/{num:int?}")]
        public IActionResult Random(int num = 10)
        {
            //var sampleQuizzes = ((JsonResult)Latest(num)).Value
            //    as List<QuizViewModel>;

            var random = dbContext.Quizzes.OrderBy(q => Guid.NewGuid()).Take(num).ToArray();

            return new JsonResult(
                random.Adapt<QuizViewModel[]>(),
                JsonSettings);
        }

        #region RESTful conventions methods 
        /// <summary> 
        /// GET: api/quiz/{id}
        /// Retrieves the Quiz with the given {id} 
        /// </summary> 
        /// <param name="id">The ID of an existing Quiz</param> 
        /// <returns>the Quiz with the given {id}</returns> 
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var quiz = dbContext.Quizzes.Where(i => i.Id == id).FirstOrDefault();

            // handle requests asking for non-existing quizzes
            if (quiz == null)
            {
                return NotFound(new
                {
                    Error = String.Format("Quiz ID {0} has not been found", id)
                });
            }

            // output the result in JSON format 
            return new JsonResult(
                quiz.Adapt<QuizViewModel>(),
                JsonSettings);
        }

        /// <summary> 
        /// Adds a new Quiz to the Database 
        /// </summary> 
        /// <param name="m">The QuizViewModel containing the data to insert</param> 
        [HttpPut]
        [Authorize]
        public IActionResult Put([FromBody]QuizViewModel model)
        {
            // return a generic HTTP Status 500 (Server Error)
            // if the client payload is invalid.
            if (model == null)
                return new StatusCodeResult(500);

            // handle the insert (without object-mapping)
            var quiz = new Quiz();

            // properties taken from the request
            quiz.Title = model.Title;
            quiz.Description = model.Description;
            quiz.Text = model.Text;
            quiz.Notes = model.Notes;

            // properties set from server-side
            quiz.CreatedDate = DateTime.Now;
            quiz.LastModifiedDate = quiz.CreatedDate;

            // Set a temporary author using the Admin user's userId
            // as user login isn't supported yet: we'll change this later on.
            //quiz.UserId = dbContext.Users.Where(u => u.UserName == "Admin")
            //    .FirstOrDefault().Id;

            quiz.UserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            // add the new quiz
            dbContext.Quizzes.Add(quiz);
            // persist the changes into the Database.
            dbContext.SaveChanges();

            // return the newly-created Quiz to the client.
            return new JsonResult(quiz.Adapt<QuizViewModel>(),
                        JsonSettings);
        }

        /// <summary> 
        /// Edit the Quiz with the given {id} 
        /// </summary> 
        /// <param name="m">The QuizViewModel containing the data to update</param> 
        [HttpPost]
        [Authorize]
        public IActionResult Post([FromBody]QuizViewModel model)
        {
            // return a generic HTTP Status 500 (Server Error)
            // if the client payload is invalid.
            if (model == null)
                return new StatusCodeResult(500);

            // retrieve the quiz to edit
            var quiz = dbContext.Quizzes.Where(q => q.Id ==
                        model.Id).FirstOrDefault();

            // handle requests asking for non-existing quizzes
            if (quiz == null)
            {
                return NotFound(new
                {
                    Error = String.Format("Quiz ID {0} has not been found",
                         model.Id)
                });
            }

            // handle the update (without object-mapping)
            //   by manually assigning the properties 
            //   we want to accept from the request
            quiz.Title = model.Title;
            quiz.Description = model.Description;
            quiz.Text = model.Text;
            quiz.Notes = model.Notes;

            // properties set from server-side
            quiz.LastModifiedDate = quiz.CreatedDate;

            // persist the changes into the Database.
            dbContext.SaveChanges();

            // return the updated Quiz to the client.
            return new JsonResult(quiz.Adapt<QuizViewModel>(),
                        JsonSettings);
        }

        /// <summary> 
        /// Deletes the Quiz with the given {id} from the Database 
        /// </summary> 
        /// <param name="id">The ID of an existing Quiz</param> 
        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(int id)
        {
            // retrieve the quiz from the Database
            var quiz = dbContext.Quizzes.Where(i => i.Id == id)
                .FirstOrDefault();

            // handle requests asking for non-existing quizzes
            if (quiz == null)
            {
                return NotFound(new
                {
                    Error = String.Format("Quiz ID {0} has not been found", id)
                });
            }

            // remove the quiz from the DbContext.
            dbContext.Quizzes.Remove(quiz);
            // persist the changes into the Database.
            dbContext.SaveChanges();

            // return an HTTP Status 200 (OK).
            return new OkResult();
        }

        #endregion
    }
}
