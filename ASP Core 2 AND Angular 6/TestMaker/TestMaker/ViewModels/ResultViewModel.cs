﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace TestMaker.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class ResultViewModel
    {

        public ResultViewModel()
        {

        }

        #region Properties 
        public int Id
        {
            get; set;
        }
        public int QuizId
        {
            get; set;
        }
        public string Text
        {
            get; set;
        }
        public int? MinValue
        {
            get; set;
        }
        public int? MaxValue
        {
            get; set;
        }
        public string Notes
        {
            get; set;
        }
        [DefaultValue(0)]
        public int Type
        {
            get; set;
        }
        [DefaultValue(0)]
        public int Flags
        {
            get; set;
        }
        [JsonIgnore]
        public DateTime CreatedDate
        {
            get; set;
        }
        public DateTime LastModifiedDate
        {
            get; set;
        }
        #endregion

    }
}
