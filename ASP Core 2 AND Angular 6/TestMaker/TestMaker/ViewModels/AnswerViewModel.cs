﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace TestMaker.ViewModels
{
    [JsonObject(MemberSerialization.OptOut)]
    public class AnswerViewModel
    {
        public AnswerViewModel()
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
        public int QuestionId
        {
            get; set;
        }
        public string Text
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
        [DefaultValue(0)]
        public int Value
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
