using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TestMaker.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestMaker.Controllers.Base
{
    [Route("api/[controller]")]
    public class BaseApiController : Controller
    {
        #region Constructor
        public BaseApiController(ApplicationDbContext context)
        {
            // Instantiate the ApplicationDbContext through DI
            dbContext = context;

            // Instantiate a single JsonSerializerSettings object
            // that can be reused multiple times.
            JsonSettings = new JsonSerializerSettings()
            {
                Formatting = Formatting.Indented
            };

        }
        #endregion

        #region Shared Properties
        protected ApplicationDbContext dbContext
        {
            get; private set;
        }
        protected JsonSerializerSettings JsonSettings
        {
            get; private set;
        }
        #endregion
    }
}
