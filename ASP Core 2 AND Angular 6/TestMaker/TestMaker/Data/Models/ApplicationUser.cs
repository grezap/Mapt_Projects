﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace TestMaker.Data.Models
{
    public class ApplicationUser : IdentityUser
    {
        #region Constructor
        public ApplicationUser()
        {

        }
        #endregion

        #region Properties

        //Commented out the below 3 properties as we inherit them from base IdentityUser, so they are no longer needed

        //[Key]
        //[Required]
        //public string Id
        //{
        //    get; set;
        //}

        //[Required]
        //[MaxLength(128)]
        //public string UserName
        //{
        //    get; set;
        //}

        //[Required]
        //public string Email
        //{
        //    get; set;
        //}

        public string DisplayName
        {
            get; set;
        }

        public string Notes
        {
            get; set;
        }

        [Required]
        public int Type
        {
            get; set;
        }

        [Required]
        public int Flags
        {
            get; set;
        }

        [Required]
        public DateTime CreatedDate
        {
            get; set;
        }

        [Required]
        public DateTime LastModifiedDate
        {
            get; set;
        }
        #endregion

        #region Lazy-Load Properties
        /// <summary>
        /// A list of all the quiz created by this users.
        /// </summary>
        public virtual List<Quiz> Quizzes
        {
            get; set;
        }
        #endregion
    }
}

