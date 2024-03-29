﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using TestMaker.Data;
using TestMaker.Data.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TestMaker.Controllers.Base
{
    [Route("api/[controller]")]
    public class BaseApiController : Controller
    {
        #region Constructor
        public BaseApiController(ApplicationDbContext context,
            RoleManager<IdentityRole> roleManager,
            UserManager<ApplicationUser> userManager,
            IConfiguration configuration)
        {
            // Instantiate the ApplicationDbContext through DI
            dbContext = context;

            RoleManager = roleManager;
            UserManager = userManager;
            Configuration = configuration;

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
        protected RoleManager<IdentityRole> RoleManager
        {
            get; private set;
        }
        protected UserManager<ApplicationUser> UserManager
        {
            get; private set;
        }
        protected IConfiguration Configuration
        {
            get; private set;
        }
        #endregion
    }
}
