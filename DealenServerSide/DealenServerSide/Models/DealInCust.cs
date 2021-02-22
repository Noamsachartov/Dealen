using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DealenServerSide.Models
{
    public class DealInCust
    {
        int coupon;
        int dealinbus_id;
        string dealincust_mail;
        DateTime timegetcoupon;
        DateTime timeusecoupon;
        bool used;

        public DealInCust(int coupon, int dealinbus_id, string dealincust_mail, DateTime timegetcoupon, DateTime timeusecoupon, bool used)
        {
            Coupon = coupon;
            Dealinbus_id = dealinbus_id;
            Dealincust_mail = dealincust_mail;
            Timegetcoupon = timegetcoupon;
            Timeusecoupon = timeusecoupon;
            Used = used;
        }

        public int Coupon { get => coupon; set => coupon = value; }
        public int Dealinbus_id { get => dealinbus_id; set => dealinbus_id = value; }
        public string Dealincust_mail { get => dealincust_mail; set => dealincust_mail = value; }
        public DateTime Timegetcoupon { get => timegetcoupon; set => timegetcoupon = value; }
        public DateTime Timeusecoupon { get => timeusecoupon; set => timeusecoupon = value; }
        public bool Used { get => used; set => used = value; }
        public DealInCust() { }


        public int Insert()
        {

            DBServices dbs = new DBServices();
            return dbs.Insert(this);
        }

        public int UseCoupon(int coupon)
        {

            DBServices dbs = new DBServices();
            return dbs.UseCoupon(coupon);
        }

  

    }
}