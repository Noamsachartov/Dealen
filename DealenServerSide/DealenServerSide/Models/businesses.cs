using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
namespace cuisin.Models
{
    public class Businesses
    {
        int id;
        string name;
        double user_rating;
        string category;
        int price_range;
        string location;
        string phone_numbers;
        string featured_image;

        public Businesses(int id, string name, double user_rating, string category, int price_range, string location, string phone_numbers, string featured_image)
        {
            Id = id;
            Name = name;
            User_rating = user_rating;
            Category = category;
            Price_range = price_range;
            Location = location;
            Phone_numbers = phone_numbers;
            Featured_image = featured_image;
        }

        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public double User_rating { get => user_rating; set => user_rating = value; }
        public string Category { get => category; set => category = value; }
        public int Price_range { get => price_range; set => price_range = value; }
        public string Location { get => location; set => location = value; }
        public string Phone_numbers { get => phone_numbers; set => phone_numbers = value; }
        public string Featured_image { get => featured_image; set => featured_image = value; }
        public Businesses() { }


        public List<Businesses> Read()
        {
            DBServices dbs = new DBServices();
            List<Businesses> bList = dbs.getBusinesses();
            return bList;
        }

        public List<Businesses> Read(string category)
        {
            DBServices dbs = new DBServices();
            List<Businesses> bList = dbs.getBusinesses(category);
            return bList;
        }

        public List<Businesses> ReadPromot(string category)
        {
            DBServices dbs = new DBServices();
            List<Businesses> bList = dbs.getPromot(category);
            if(bList.Count > 0)
            {
                dbs.CampaignView(bList);
            }
            return bList;
        }
        public List<Businesses> ReadActive(string category)
        {
            DBServices dbs = new DBServices();
            List<Businesses> bList = dbs.getActive(category);
            return bList;
        }

        public List<Businesses> ReadByUser(int[] att_id)
        {
            DBServices dbs = new DBServices();
            List<Businesses> bList = dbs.getBusinessesByUser(att_id);
            return bList;
        }

        public List<Businesses> ReadByUser(int[] att_id, string category)
        {
            DBServices dbs = new DBServices();
            List<Businesses> bList = dbs.getBusinessesByUser(att_id, category);
            return bList;
        }

        public List<Businesses> ReadPromotByUser(int[] att_id, string category)
        {
            DBServices dbs = new DBServices();
            List<Businesses> bList = dbs.getPromotBusinessesByUser(att_id, category);
            if (bList.Count > 0)
            {
                dbs.CampaignView(bList);
            }
            return bList;
        }


    }
}