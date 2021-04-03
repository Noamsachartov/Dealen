using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DealenServerSide.Models
{
    public class Businesses
    {
        int bid;
        string bname;
        string btypebus;
        string baddress;
        string bphone;
        string manager;
        string bdescription; 
        string bmail;
        string password;
        TimeSpan opentime;
        TimeSpan closetime;
        string bimage;
        double latitude;
        double longitude;
        
            

        public int Bid { get => bid; set => bid = value; }
        public string Bname { get => bname; set => bname = value; }
        public string Btypebus { get => btypebus; set => btypebus = value; }
        public string Baddress { get => baddress; set => baddress = value; }
        public string Bphone { get => bphone; set => bphone = value; }
        public string Manager { get => manager; set => manager = value; }
        public string Bdescription { get => bdescription; set => bdescription = value; }
        public string Bmail { get => bmail; set => bmail = value; }
        public string Password { get => password; set => password = value; }
        public TimeSpan Opentime { get => opentime; set => opentime = value; }
        public TimeSpan Closetime { get => closetime; set => closetime = value; }
        public string Bimage { get => bimage; set => bimage = value; }
        public double Latitude { get => latitude; set => latitude = value; }
        public double Longitude { get => longitude; set => longitude = value; }

        public Businesses() { }

        public Businesses(int bid, string bname, string btypebus, string baddress, string bphone, string manager, string bdescription, string bmail, string password, TimeSpan opentime, TimeSpan closetime, string bimage, double latitude, double longitude)
        {
            Bid = bid;
            Bname = bname;
            Btypebus = btypebus;
            Baddress = baddress;
            Bphone = bphone;
            Manager = manager;
            Bdescription = bdescription;
            Bmail = bmail;
            Password = password;
            Opentime = opentime;
            Closetime = closetime;
            Bimage = bimage;
            Latitude = latitude;
            Longitude = longitude;
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