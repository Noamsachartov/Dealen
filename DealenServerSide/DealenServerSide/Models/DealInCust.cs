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
        int dealincust_id;
        DateTime timegetcoupon;
        DateTime timeusecoupon;
        bool used;
        double distance;

        public DealInCust(int coupon, int dealinbus_id, int dealincust_id, DateTime timegetcoupon, DateTime timeusecoupon, bool used, double distance)
        {
            Coupon = coupon;
            Dealinbus_id = dealinbus_id;
            Dealincust_id = dealincust_id;
            Timegetcoupon = timegetcoupon;
            Timeusecoupon = timeusecoupon;
            Used = used;
            Distance = distance;
        }

        public int Coupon { get => coupon; set => coupon = value; }
        public int Dealinbus_id { get => dealinbus_id; set => dealinbus_id = value; }
        public int Dealincust_id { get => dealincust_id; set => dealincust_id = value; }
        public DateTime Timegetcoupon { get => timegetcoupon; set => timegetcoupon = value; }
        public DateTime Timeusecoupon { get => timeusecoupon; set => timeusecoupon = value; }
        public bool Used { get => used; set => used = value; }
        public double Distance { get => distance; set => distance = value; }

        public DealInCust() { }

        //User want the Deal and get a coupon
        public int Insert()
        {
            DBServices dbs = new DBServices();
            return dbs.Insert(this);
        }

        //business owner check the coupon
        public int UseCoupon(int coupon)
        {
            DBServices dbs = new DBServices();
            return dbs.UseCoupon(coupon);
        }

        //User want to cancal approval
        public int CancelDeal(int coupon)
        {
            DBServices dbs = new DBServices();
            return dbs.CancelDeal(coupon);
        }
        public int LikeDeal(int coupon, bool isbefore, int cust_id, int deal_id)
        {
            DBServices dbs = new DBServices();
            return dbs.LikeDeal(coupon,true,isbefore, cust_id, deal_id);
        }
        public int UNLikeDeal(int coupon, bool isbefore, int cust_id, int deal_id)
        {
            DBServices dbs = new DBServices();
            return dbs.LikeDeal(coupon,false, isbefore, cust_id, deal_id);
        }



    }
}