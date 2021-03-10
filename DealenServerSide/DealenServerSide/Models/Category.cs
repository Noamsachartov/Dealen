using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DealenServerSide.Models
{
    public class Category
    {
        int id;
        string name;
        string image;
        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string Image { get => image; set => image = value; }
        public Category(int id, string name, string image)
        {
            Id = id;
            Name = name;
            Image = image;
        }

        public Category() { }

        public List<Category> Read()
        {
            DBServices dbs = new DBServices();
            List<Category> clist = dbs.getCategory();
            return clist;
        }

        public List<Category> Read_Active()
        {
            DBServices dbs = new DBServices();
            List<Category> clist = dbs.getCategory_Active();
            return clist;
        }



    }
}