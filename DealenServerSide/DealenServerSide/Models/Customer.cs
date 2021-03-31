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
        string p_category;
        string p_typebus;
        float p_distance;


        public int Cust_id { get => cust_id; set => cust_id = value; }
        public string Cust_fname { get => cust_fname; set => cust_fname = value; }
        public string Cust_address { get => cust_address; set => cust_address = value; }
        public string Cust_phone { get => cust_phone; set => cust_phone = value; }
        public DateTime Birthdate { get => birthdate; set => birthdate = value; }
        public string Cust_mail { get => cust_mail; set => cust_mail = value; }
        public string Password { get => password; set => password = value; }
        public string Image { get => image; set => image = value; }
        public string Cust_lname { get => cust_lname; set => cust_lname = value; }
        public string P_category { get => p_category; set => p_category = value; }
        public string P_typebus { get => p_typebus; set => p_typebus = value; }
        public float P_distance { get => p_distance; set => p_distance = value; }

        //internal Spatial.DbGeography Location { get => location; set => location = value; }



       
        public Customer() { }

        public Customer(int cust_id, string cust_fname, string cust_address, string cust_phone, DateTime birthdate, string cust_mail, string password, string image, string cust_lname, string p_category, string p_typebus, float p_distance)
        {
            Cust_id = cust_id;
            Cust_fname = cust_fname;
            Cust_address = cust_address;
            Cust_phone = cust_phone;
            Birthdate = birthdate;
            Cust_mail = cust_mail;
            Password = password;
            Image = image;
            Cust_lname = cust_lname;
            P_category = p_category;
            P_typebus = p_typebus;
            P_distance = p_distance;
        }

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