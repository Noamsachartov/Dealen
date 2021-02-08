using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DealenServerSide.Models
{
    public class Deal
    {
        int id;
        string name;
        string description;
        string image;
        int cat_id;
        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string Description { get => description; set => description = value; }
        public string Image { get => image; set => image = value; }
        public int Cat_id { get => cat_id; set => cat_id = value; }

        public Deal(int id, string name, string description, string image, int cat_id)
        {
            Id = id;
            Name = name;
            Description = description;
            Image = image;
            Cat_id = cat_id;
        }

        public Deal() { }

     
    }
}