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
        int business_id;
        string category;
        TimeSpan startime;
        TimeSpan endtime;
        string image; 
        int cat_id;
        int discount;
        Businesses bus_rest;
        DateTime date;
        int coupon;


        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string Description { get => description; set => description = value; }
        public string Business_Name { get => business_Name; set => business_Name = value; }
        public string Category { get => category; set => category = value; }
        public TimeSpan Startime { get => startime; set => startime = value; }
        public TimeSpan Endtime { get => endtime; set => endtime = value; }
        public string Image { get => image; set => image = value; }
        public int Cat_id { get => cat_id; set => cat_id = value; }
        public int Business_id { get => business_id; set => business_id = value; }
        public int Discount { get => discount; set => discount = value; }
        public DateTime Date { get => date; set => date = value; }

        public Businesses Bus_rest { get => bus_rest; set => bus_rest = value; }
        public int Coupon { get => coupon; set => coupon = value; }


        public Deal() { }

        public Deal(int id, string name, string description, string business_Name, string category, TimeSpan startime, TimeSpan endtime, string image, int cat_id, int business_id, int discount, DateTime date, int coupon)
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
            Business_id = business_id;
            Discount = discount;
            Coupon = coupon;

        }

        public List<Deal> Read()
        {
            DBServices dbs = new DBServices();
            List<Deal> dlist = dbs.getDeals();
            return dlist;
        }
        public List<Deal> ReadActive()
        {
            DBServices dbs = new DBServices();
            List<Deal> dlist = dbs.getDealsActive();
            return dlist;
        }
        public List<Deal> ReadbyRest(int rest_id)
        {
            DBServices dbs = new DBServices();
            List<Deal> dlist = dbs.getDealsByRest(rest_id);
            return dlist;
        }
        public List<Deal> Readbycat(int cat_id)
        {
            DBServices dbs = new DBServices();
            List<Deal> dlist = dbs.getDealsByCat(cat_id);
            return dlist;
        }

        public List<Deal> Readbydeal(int cat_id)
        {
            DBServices dbs = new DBServices();
            List<Deal> dlist = dbs.getDealsByDeal(cat_id);
            return dlist;
        }

        public List<Deal> Readlastdeals(int cust_id)
        {
            DBServices dbs = new DBServices();
            List<Deal> dlist = dbs.getDealslastDeals(cust_id);
            return dlist;
        }
        public List<Deal> ReadSearch(string Letters)
        {
            DBServices dbs = new DBServices();
            List<Deal> dlist = dbs.getDealsBySearch(Letters);
            return dlist;
        }

        public int Insert()
        {
            DBServices dbs = new DBServices();
            return dbs.Insert(this);

        }

    }
}