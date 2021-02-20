using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace DealenServerSide.Models
{
    public class Customer
    {
        int cust_id;
        string cust_fname;
        string cust_lname;
        string cust_address;
        string cust_phone;
        DateTime birthdate;
        string cust_mail;
        string password;
        //System.Data.Spatial.DbGeography location;
        string image;


        public int Cust_id { get => cust_id; set => cust_id = value; }
        public string Cust_fname { get => cust_fname; set => cust_fname = value; }
        public string Cust_address { get => cust_address; set => cust_address = value; }
        public string Cust_phone { get => cust_phone; set => cust_phone = value; }
        public DateTime Birthdate { get => birthdate; set => birthdate = value; }
        public string Cust_mail { get => cust_mail; set => cust_mail = value; }
        public string Password { get => password; set => password = value; }
        public string Image { get => image; set => image = value; }
        public string Cust_lname { get => cust_lname; set => cust_lname = value; }

        //internal Spatial.DbGeography Location { get => location; set => location = value; }

        public Customer(int cust_id, string cust_fname, string cust_lname, string cust_address, string cust_phone, DateTime birthdate, string cust_mail, string password, string image/*, Spatial.DbGeography location*/)
        {
            Cust_id = cust_id;
            Cust_fname = cust_fname;
            Cust_lname = cust_lname;
            Cust_address = cust_address;
            Cust_phone = cust_phone;
            Birthdate = birthdate;
            Cust_mail = cust_mail;
            Password = password;
            Image = image;
            //Location = location;
        }

       
        public Customer() { }

        public List<Customer> CheckIfLog(string mail, string password)
        {
            DBServices dbs = new DBServices();
            List<Customer> l = dbs.CheckIfExits(mail, password);
            return l;
        }

        public int Insert()
        {
            DBServices dbs = new DBServices();
            return dbs.Insert(this);

        }
    }
}