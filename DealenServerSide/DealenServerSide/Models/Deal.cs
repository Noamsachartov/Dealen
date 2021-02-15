﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace DealenServerSide.Models
{
    public class Deal
    {
        int id;
        string name;
        string description;
        string business_Name;
        string category;
        DateTime startime;
        DateTime endtime;
        string image; 
        int cat_id;

        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string Description { get => description; set => description = value; }
        public string Business_Name { get => business_Name; set => business_Name = value; }
        public string Category { get => category; set => category = value; }
        public DateTime Startime { get => startime; set => startime = value; }
        public DateTime Endtime { get => endtime; set => endtime = value; }
        public string Image { get => image; set => image = value; }
        public int Cat_id { get => cat_id; set => cat_id = value; }


        public Deal(int id, string name, string description, string business_Name, string category, DateTime startime, DateTime endtime, string image, int cat_id)
        {
            Id = id;
            Name = name;
            Description = description;
            Business_Name = business_Name;
            Category = category;
            Startime = startime;
            Endtime = endtime;
            Image = image;
            Cat_id = cat_id;
        }
        public Deal() { }



        public List<Deal> Read()
        {
            DBServices dbs = new DBServices();
            List<Deal> dlist = dbs.getDeals();
            return dlist;
        }
        public List<Deal> Readbycat(int cat_id)
        {
            DBServices dbs = new DBServices();
            List<Deal> dlist = dbs.getDealsByCat(cat_id);
            return dlist;
        }
        public int Insert()
        {
            DBServices dbs = new DBServices();
            return dbs.Insert(this);

        }

    }
}