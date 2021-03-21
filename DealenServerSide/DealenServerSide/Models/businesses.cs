﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DealenServerSide.Models
{
    public class Businesses
    {
        int bid;
        string bname;
        string baddress;
        string bphone;
        string manager;
        string bdescription; 
        string bmail;
        string password;
        TimeSpan opentime;
        TimeSpan closetime;
        string bimage;
        
            

        public int Bid { get => bid; set => bid = value; }
        public string Bname { get => bname; set => bname = value; }
        public string Baddress { get => baddress; set => baddress = value; }
        public string Bphone { get => bphone; set => bphone = value; }
        public string Manager { get => manager; set => manager = value; }
        public string Bdescription { get => bdescription; set => bdescription = value; }
        public string Bmail { get => bmail; set => bmail = value; }
        public string Password { get => password; set => password = value; }
        public TimeSpan Opentime { get => opentime; set => opentime = value; }
        public TimeSpan Closetime { get => closetime; set => closetime = value; }
        public string Bimage { get => bimage; set => bimage = value; }

        public Businesses() { }

        public Businesses(int bid, string bname, string baddress, string bphone, string manager, string bdescription, string bmail, string password, TimeSpan opentime, TimeSpan closetime, string bimage)
        {
            Bid = bid;
            Bname = bname;
            Baddress = baddress;
            Bphone = bphone;
            Manager = manager;
            Bdescription = bdescription;
            Bmail = bmail;
            Password = password;
            Opentime = opentime;
            Closetime = closetime;
            Bimage = bimage;
        }


        public int Insert()
        {
            DBServices dbs = new DBServices();
            return dbs.Insert(this);
        }
        public List<Businesses> CheckIfLog(string bmail, string password)
        {
            DBServices dbs = new DBServices();
            List<Businesses> b = dbs.CheckIfbExits(bmail, password);
            return b;
        }
        public List<Businesses> ReadActiveRest()
        {
            DBServices dbs = new DBServices();
            List<Businesses> bus = dbs.getActiveRes();
            return bus;
        }



    }
}