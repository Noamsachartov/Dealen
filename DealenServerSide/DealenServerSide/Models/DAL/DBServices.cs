using System;
using System.Data.SqlClient;
using System.Web.Configuration;
using System.Data;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using DealenServerSide.Models;
using static System.Device.Location.GeoCoordinate;
using System.Globalization;
using System.Runtime.Remoting.Messaging;
using System.Drawing;
using System.Web.WebPages;


public class DBServices
{
    public SqlDataAdapter da;
    public DataTable dt;
    private string command;

    public SqlConnection connect(String conString)
    {

        // read the connection string from the configuration file
        string cStr = WebConfigurationManager.ConnectionStrings[conString].ConnectionString;
        SqlConnection con = new SqlConnection(cStr);
        con.Open();
        return con;
    }


    // Build the Insert command String
    //--------------------------------------------------------------------


    // Create the SqlCommand
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommand(String CommandSTR, SqlConnection con)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = CommandSTR;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.Text; // the type of the command, can also be stored procedure

        return cmd;
    }

    //הכנסת בעל עסק חדש
    public int Insert(Businesses businesses)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("DBConnectionString"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertCommand(businesses);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = Convert.ToInt32(cmd.ExecuteScalar()); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //קריאה להכנסת בעל עסק

    private String BuildInsertCommand(Businesses businesses)
    {
        String command;
        command = "";
      
        //System.Device.Location.GeoCoordinate location1 = new System.Device.Location.GeoCoordinate(-29.83245, 31.04034);
        //System.Device.Location.GeoCoordinate location2 = new System.Device.Location.GeoCoordinate(-51.39792, -0.12084);
        //double distance = location1.GetDistanceTo(location2);

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values('{0}', '{1}','{2}','{3}', '{4}','{5}','{6}','{7}','{8}','{9}','{10}',{11},{12});", businesses.Bname, businesses.Baddress, businesses.Bphone, businesses.Manager,businesses.Bmail, businesses.Password,businesses.Opentime,businesses.Closetime, businesses.Bimage, businesses.Bdescription, businesses.Btypebus, businesses.Latitude,businesses.Longitude);
        String prefixc = "INSERT INTO [Businesses_2021] " + "([bname],[baddress],[bphone],[manager],[bmail],[password],[opentime],[closetime],[bimage],[bdescription],[btype],[latitude],[longitude])";

        String get_id = "SELECT SCOPE_IDENTITY();";
        command = prefixc + sb.ToString() + get_id;

        return command;
    }

    //הכנסת לקוח - Dealen
    public int Insert(Customer customer)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("DBConnectionString"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertCommand(customer);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = Convert.ToInt32(cmd.ExecuteScalar()); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    //--------------------------------------------------------------------
    private String BuildInsertCommand(Customer customer)
    {
        String command;
        command = "";

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        var f = customer.Birthdate.ToString("yyyy-MM-dd");
        sb.AppendFormat("Values('{0}', '{1}','{2}','{3}', '{4}', '{5}','{6}','{7}');", customer.Cust_fname, customer.Cust_address, customer.Cust_phone, customer.Cust_mail, f, customer.Password, customer.Image, customer.Cust_lname);
        String prefixc = "INSERT INTO [Customer_2021] " + "([cust_fname],[cust_address],[cust_phone],[cust_mail],[birthdate],[password],[image],[cust_lname])";

        String get_id = "SELECT SCOPE_IDENTITY();";
        command = prefixc + sb.ToString() + get_id;

        return command;
    }

    //הכנסת לקוח - Dealen
    public int UpdateIntialPreferences(int id, Customer customer)
    {

        SqlConnection con;
        SqlCommand cmd;
        SqlCommand cmd1;
        SqlCommand cmd2;


        try
        {
            con = connect("DBConnectionString"); // create the connection
           


        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildUpdateCatCommand(id, customer);      // helper method to build the insert string
        String cStr1 = BuildUpdateBTypeCommand(id, customer);
        String cStr2 = BuildUpdateDistanceCommand(id, customer);

        cmd = CreateCommand(cStr, con);             // create the command
        cmd1 = CreateCommand(cStr1, con);
        cmd2 = CreateCommand(cStr2, con);

        try
        {
            int numEffected = cmd.ExecuteNonQuery();
            int numEffected1 = cmd1.ExecuteNonQuery();
            int numEffected2 = cmd2.ExecuteNonQuery();

            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    private String BuildUpdateCatCommand(int id, Customer customer)
    {
        String command;
        command = "";

        string CatsInsert = "";
        foreach (var item in customer.P_category)
        {
            CatsInsert += " (" + id.ToString() + "," + item.ToString() + ") ,";
        }
        CatsInsert = CatsInsert.Remove(CatsInsert.Length - 1);

        StringBuilder sb = new StringBuilder();
        sb.AppendFormat(" Values " + CatsInsert);
        String prefixc = "Insert into CatInCust_2021 (Cust_id,Cat_id)";
        //String get_id = "SELECT SCOPE_IDENTITY();";
        //command = prefixc + sb.ToString() + get_id;
        command = prefixc + sb.ToString();


        return command;

    }


    private String BuildUpdateBTypeCommand(int id, Customer customer)
    {
        String command;
        command = "";


        string BTypesInsert = "";
        foreach (var item in customer.P_type)
        {
            BTypesInsert += " (" + id.ToString() + "," + item.ToString() + ") ,";
        }
        BTypesInsert = BTypesInsert.Remove(BTypesInsert.Length - 1);

        StringBuilder sb = new StringBuilder();
        sb.AppendFormat(" Values " + BTypesInsert);
        String prefixc = "Insert into BTypeInCust_2021 (Cust_id,BType_Id)";
        //String get_id = "SELECT SCOPE_IDENTITY();";
        //command = prefixc + sb.ToString() + get_id;
        command = prefixc + sb.ToString();


        return command;

    }

    //--------------------------------------------------------------------
    private String BuildUpdateDistanceCommand(int id, Customer customer)
    {
        String command;
        command = "UPDATE Customer_2021 set  P_Distance='" + customer.P_distance + "' where cust_id = " + id.ToString();
        return command;
    }

    public int UpdateIntialPreferencesfromPrivate(int id, Customer customer)
    {

        SqlConnection con;
        SqlCommand cmd;
        SqlCommand cmd1;


        try
        {
            con = connect("DBConnectionString"); // create the connection
            if (customer.P_type.Length > 0)
            {
                cmd = CreateCommand("DELETE FROM BTypeInCust_2021 WHERE cust_id=" + id + ";", con);
                int numEffected = cmd.ExecuteNonQuery();

            }
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildUpdateBTypeCommand(id, customer);
        String cStr1 = BuildUpdateDistanceCommand(id, customer);

        cmd = CreateCommand(cStr, con);
        cmd1 = CreateCommand(cStr1, con);

        try
        {
            int numEffected = cmd.ExecuteNonQuery();
            int numEffected2 = cmd1.ExecuteNonQuery();
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    private String BuildUpdateCommandInitialPref(int id, Customer customer)
    {
        String command;
        command = "UPDATE Customer_2021 set P_TypeBus='" + customer.P_type + "', P_Distance='" + customer.P_distance + "' where cust_id = " + id.ToString();
        return command;
    }
   


    //הכנסה מבצע חדש
    public int Insert(Deal deal)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("DBConnectionString"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertCommand(deal);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = Convert.ToInt32(cmd.ExecuteScalar()); // execute the command
            try
            {
                String cStr1 = BuildInsertCommandlink(deal, numEffected);      // helper method to build the insert string
                cmd = CreateCommand(cStr1, con);
                int numEffected2 = Convert.ToInt32(cmd.ExecuteScalar());
                String cStr3 = BuildInsertCommandTags(deal, numEffected2);      // helper method to build the insert tags
                cmd = CreateCommand(cStr3, con);
                int numEffected3 = cmd.ExecuteNonQuery();
                String cStr4 = BuildInsertCommandCats(deal, numEffected);      // helper method to build the insert tags
                cmd = CreateCommand(cStr4, con);
                int numEffected4 = cmd.ExecuteNonQuery();
                return numEffected;


            }
            catch (Exception)
            {
                throw;
            }
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    //בניית קריאה להכנסה למבצע
    private String BuildInsertCommand(Deal deal)
    {
        String command;
        command = "";

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values('{0}', '{1}','{2}');", deal.Name, deal.Description, deal.Image);
        String prefixc = "INSERT INTO [Deal_2021] " + "([name],[description],[image])";
        String get_id = "SELECT SCOPE_IDENTITY();";
        command = prefixc + sb.ToString() + get_id;

        return command;

    }

    // לבניית קריאה לטבלה מקשרת של מבצעים ובעלי עסקים Dealen
    private String BuildInsertCommandlink(Deal deal, int deal_id)
    {
        String command;
        command = "";

        StringBuilder sb = new StringBuilder();
        var d = deal.Date.ToString("yyyy-MM-dd");
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values({0}, {1},{2},'True','{3}','{4}','{5}',{6});", deal.Business_id, deal_id, deal.Discount, deal.Startime,deal.Endtime,d, deal.Pcost);
        String prefixc = "INSERT INTO [dealInbus_2021] " + "([business_id],[deal_id],[discount],[active],[startime],[endtime],[date], Pcost)";
        String get_id = "SELECT SCOPE_IDENTITY();";
        command = prefixc + sb.ToString() + get_id;

        return command;

    }

    private String BuildInsertCommandTags(Deal deal, int deal_id)
    {
        String command;
        command = "";

        string TagsInsert = "";
        foreach (var item in deal.Tags)
        {
            TagsInsert += " (" + item.ToString() + "," + deal_id.ToString() + ") ,";
        }
        TagsInsert = TagsInsert.Remove(TagsInsert.Length - 1);

        StringBuilder sb = new StringBuilder();
        sb.AppendFormat(" Values " + TagsInsert);
        String prefixc = "Insert into TagsInDeals_2021 (Tag_Id,Deal_id)";
        //String get_id = "SELECT SCOPE_IDENTITY();";
        //command = prefixc + sb.ToString() + get_id;
        command = prefixc + sb.ToString();

        return command;

    }

    private String BuildInsertCommandCats(Deal deal, int deal_id)
    {
        String command;
        command = "";

        string CatsInsert = "";
        foreach (var item in deal.Cat_id)
        {
            CatsInsert += " (" + deal_id.ToString() + "," + item.ToString() + ") ,";
        }
        CatsInsert = CatsInsert.Remove(CatsInsert.Length - 1);

        StringBuilder sb = new StringBuilder();
        sb.AppendFormat(" Values " + CatsInsert);
        String prefixc = "Insert into CatInDeal_2021 (Deal_id, Cat_id)";
        //String get_id = "SELECT SCOPE_IDENTITY();";
        //command = prefixc + sb.ToString() + get_id;
        command = prefixc + sb.ToString();

        return command;



    }

    public int Insert(DealInCust dealInCust)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("DBConnectionString"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertCommand(dealInCust);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            return Convert.ToInt32(cmd.ExecuteScalar()); // execute the command

        }
        catch (SqlException ex)
        {
            if (ex.Number == 2627)
            {
                return Insert(dealInCust);  // לשלוח עוד פעם לפונקציה שמייצרת מספר ומכניסה לdb
            }
            else
                // write to log
                throw (ex);
        }


        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    private String BuildInsertCommand(DealInCust busInCust)
    {
        String command;
        command = "";
        Random generator = new Random();
        int r = generator.Next(100000, 1000000);

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values({0}, {1},'{2}','False',GETDATE());", r, busInCust.Dealinbus_id, busInCust.Dealincust_id);
        String prefixc = "INSERT INTO [dealIncust_2021] " + "([coupon],[dealinbus_id],[dealincust_id],[used],[timegetcoupon])";
        String get_id = "SELECT " + r + ";";
        command = prefixc + sb.ToString() + get_id;

        return command;

    }





    //פונקציה בדיקה האם הלקוח קיים במערכת-Dealen
    public List<Customer> CheckIfExits(string mail, string password)
    {
        SqlConnection con = null;
        List<Customer> customers = new List<Customer>();

        try
        {
            con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

            String selectSTR = "select cust_id,[cust_fname],[cust_lname],cust_address,cust_phone,birthdate,cust_mail, password,[image] from Customer_2021 where cust_mail = '" + mail.ToString() + "' and [password] = '" + password.ToString() + "'";
            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

            while (dr.Read())
            {   // Read till the end of the data into a row
                Customer c = new Customer();

                c.Cust_id = Convert.ToInt32(dr["cust_id"]);
                c.Cust_fname = (string)dr["cust_fname"];
                c.Cust_lname = (string)dr["cust_lname"];
                c.Cust_address = (string)dr["cust_address"];
                c.Cust_mail = (string)dr["cust_mail"];
                c.Cust_phone = (string)dr["cust_phone"];
                c.Password = (string)dr["password"];

                if (!dr.IsDBNull(6))
                {
                    c.Image = (string)dr["image"];
                }
                else
                {
                    c.Image = string.Empty;
                }

                customers.Add(c);
            }

            return customers;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }
    }

    public List<Customer> GetCustomer(int id)
    {
        SqlConnection con = null;
        List<Customer> customers = new List<Customer>();

        try
        {
            con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file
            String selectSTR = "SELECT Customer_2021.cust_id,Customer_2021.cust_fname, Customer_2021.cust_lname,Customer_2021.cust_address, Customer_2021.cust_mail, Customer_2021.cust_phone,  " +
                "case when CONVERT(int, SUM(dealInbus_2021.discount * dealInbus_2021.Pcost))<>NULL then CONVERT(int, SUM(dealInbus_2021.discount * dealInbus_2021.Pcost)) else 0 end  AS Totalsave, " +
                "Customer_2021.birthdate,  Customer_2021.image " +
                "FROM Customer_2021 left JOIN dealIncust_2021 ON Customer_2021.cust_id = dealIncust_2021.dealincust_id left JOIN dealInbus_2021 ON dealIncust_2021.dealinbus_id = dealInbus_2021.id WHERE (Customer_2021.cust_id = "+id+")  " +
                "GROUP BY Customer_2021.cust_id, Customer_2021.cust_fname, Customer_2021.cust_address, Customer_2021.cust_phone, Customer_2021.birthdate, Customer_2021.cust_mail, Customer_2021.image, Customer_2021.cust_lname; ";
            SqlCommand cmd = new SqlCommand(selectSTR, con);
                
            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

            while (dr.Read())
            {   // Read till the end of the data into a row
                Customer c = new Customer();

                c.Cust_id = Convert.ToInt32(dr["cust_id"]);
                c.Cust_fname = (string)dr["cust_fname"];
                c.Cust_lname = (string)dr["cust_lname"];
                c.Cust_address = (string)dr["cust_address"];
                c.Cust_mail = (string)dr["cust_mail"];
                c.Cust_phone = (string)dr["cust_phone"];
                c.Totalsave= Convert.ToInt32(dr["Totalsave"]);

                if (!dr.IsDBNull(6))
                {
                    c.Image = (string)dr["image"];
                }
                else
                {
                    c.Image = string.Empty;
                }

                customers.Add(c);
            }

            return customers;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }
    }

    


    //Dealen-בדיקה האם בעל עסק קיים במערכת
    public List<Businesses> CheckIfbExits(string bmail, string password)
    {
        SqlConnection con = null;
        List<Businesses> blist = new List<Businesses>();

        try
        {
            con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

            String selectSTR = "select bid, bname, baddress, bphone, manager, bmail, password, opentime, closetime, bimage, bdescription from Businesses_2021 where bmail = '" + bmail.ToString() + "' and [password] = '" + password.ToString() + "'";
            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

            while (dr.Read())
            {   // Read till the end of the data into a row
                Businesses b = new Businesses();

                b.Bid = Convert.ToInt32(dr["bid"]);
                b.Bname = (string)dr["bname"];
                b.Baddress = (string)dr["baddress"];
                b.Bphone = (string)dr["bphone"];
                b.Manager = (string)dr["manager"];
                b.Bmail = (string)dr["bmail"];
                b.Password = (string)dr["password"];
                b.Opentime = (TimeSpan)dr["opentime"];
                b.Closetime = (TimeSpan)dr["closetime"];
                b.Bimage = (string)dr["bimage"];
                b.Bdescription = (string)dr["bdescription"];


                blist.Add(b);
            }

            return blist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }
    }

    // return restaurants with active Deal 

    public List<Businesses> getActiveRes()
    {
        SqlConnection con = null;
        List<Businesses> blist = new List<Businesses>();

        string selectSTR = null;
        try
        {
            con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

            StringBuilder sb = new StringBuilder();

            sb.AppendFormat("SELECT B.bid, B.bname, B.baddress, B.bphone, B.opentime, B.closetime, B.bimage, B.bdescription" +
                " FROM Businesses_2021 as B INNER JOIN dealInbus_2021 as DB ON B.bId=DB.business_id " +
                " WHERE db.date=CONVERT(date, GETDATE()) and CONVERT(time, GETDATE()) BETWEEN db.startime and db.endtime");
            selectSTR = sb.ToString();


            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            while (dr.Read())
            {   // Read till the end of the data into a row
                Businesses b = new Businesses();


                b.Bid = Convert.ToInt32(dr["bid"]);
                b.Bname = (string)dr["bname"];
                b.Baddress = (string)dr["baddress"];
                b.Bphone = (string)dr["bphone"];
                b.Opentime = (TimeSpan)dr["opentime"];
                b.Closetime = (TimeSpan)dr["closetime"];
                b.Bimage = (string)dr["bimage"];
                b.Bdescription = (string)dr["bdescription"];

                blist.Add(b);

            }

            return blist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }

    }


    //קבלת המבצעים-Dealen
    public List<Deal> getDeals()
    {
        List<Deal> dlist = new List<Deal>();
        SqlConnection con = null;

        string selectSTR = null;
        try
        {
            
            con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file
            StringBuilder sb = new StringBuilder();

            sb.AppendFormat(" SELECT dealInbus_2021.id,dealInbus_2021.business_id, Businesses_2021.bname, dealInbus_2021.startime, dealInbus_2021.endtime, dealInbus_2021.discount, Deal_2021.image, Deal_2021.description, Deal_2021.name AS deal_name, Businesses_2021.latitude, Businesses_2021.longitude FROM Businesses_2021 INNER JOIN dealInbus_2021 ON Businesses_2021.bid = dealInbus_2021.business_id INNER JOIN Deal_2021 ON dealInbus_2021.deal_id = Deal_2021.id ");
                selectSTR = sb.ToString(); 
        


            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            while (dr.Read())
            {   // Read till the end of the data into a row
                Businesses b = new Businesses();
                Deal d = new Deal();
                d.Id = Convert.ToInt32(dr["id"]);
                d.Name = (string)dr["deal_name"];
                d.Business_Name = (string)dr["bname"];
                d.Business_id = Convert.ToInt32(dr["business_id"]);
                d.Startime = (TimeSpan)dr["startime"];
                d.Endtime = (TimeSpan)dr["endtime"];
                d.Image = (string)dr["image"];
                d.Description = (string)dr["description"];
                d.Discount = Convert.ToInt32(Convert.ToDouble(dr["discount"]) * 100);
                b.Latitude = Convert.ToDouble(dr["latitude"]);
                b.Longitude = Convert.ToDouble(dr["longitude"]);
                d.Bus_rest = b;

                DateTime now = DateTime.Now;

                DateTime end =DateTime.Today+ d.Endtime;

                TimeSpan TimeToEndDeal = end - now;
                d.MinutesToend = Convert.ToInt32(TimeToEndDeal.TotalMinutes);


                dlist.Add(d);
            }

            return dlist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }

    }
    //get all deals active
    public List<Deal> getDealsActive()
    {
        List<Deal> dlist = new List<Deal>();
        SqlConnection con = null;

        string selectSTR = null;
        try
        {
            con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

            StringBuilder sb = new StringBuilder();

            sb.AppendFormat(" SELECT db.id,db.business_id, b.bname, db.startime, db.endtime, db.discount, c.name AS catgeory_name, " +
                            " d.image, d.description, d.name AS deal_name  " +
                            " FROM Businesses_2021 AS b INNER JOIN dealInbus_2021 AS db ON b.bid = db.business_id INNER JOIN Deal_2021 AS d ON" +
                            " db.deal_id = d.id  " +
                            "WHERE db.date=CONVERT(date, GETDATE()) and CONVERT(time,GETDATE()) BETWEEN db.startime and db.endtime");

            selectSTR = sb.ToString();


            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            while (dr.Read())
            {   // Read till the end of the data into a row
                Deal d = new Deal();
                d.Id = Convert.ToInt32(dr["id"]);
                d.Name = (string)dr["deal_name"];
                d.Business_Name = (string)dr["bname"];
                d.Business_id = Convert.ToInt32(dr["business_id"]);
                d.Category = (string)dr["catgeory_name"];
                d.Startime = (TimeSpan)dr["startime"];
                d.Endtime = (TimeSpan)dr["endtime"];
                d.Image = (string)dr["image"];
                d.Description = (string)dr["description"];
                d.Discount = Convert.ToInt32(Convert.ToDouble(dr["discount"]) * 100);

                DateTime now = DateTime.Now;

                DateTime end = DateTime.Today + d.Endtime;

                TimeSpan TimeToEndDeal = end - now;
                d.MinutesToend = Convert.ToInt32(TimeToEndDeal.TotalMinutes);

                dlist.Add(d);
            }

            return dlist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }

    }
    //קבלת מבצע לפי קטגוריה
    public List<Deal> getDealsByCat(int cat_id)
    {
        List<Deal> dlist = new List<Deal>();
        SqlConnection con = null;

        string selectSTR = null;
        try
        {
            con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

            StringBuilder sb = new StringBuilder();

            sb.AppendFormat("SELECT DISTINCT dealInbus_2021.id, Businesses_2021.bname, dealInbus_2021.business_id, dealInbus_2021.discount, dealInbus_2021.active, dealInbus_2021.startime, " +
                "dealInbus_2021.endtime, dealInbus_2021.date, Deal_2021.name as deal_name , Deal_2021.description, Deal_2021.image, Businesses_2021.latitude, Businesses_2021.longitude  " +
                "FROM dealInbus_2021 INNER JOIN " +
                "Deal_2021 ON dealInbus_2021.deal_id = Deal_2021.Id INNER JOIN " +
                "CatInDeal_2021 ON Deal_2021.Id = CatInDeal_2021.Deal_id inner join Businesses_2021 on Businesses_2021.bid = dealInbus_2021.business_id " +
                "WHERE dealInbus_2021.date = CONVERT(date, GETDATE()) and CONVERT(time, GETDATE()) BETWEEN dealInbus_2021.startime and " +
                "dealInbus_2021.endtime and CatInDeal_2021.Cat_id = " + cat_id);

            selectSTR = sb.ToString();


            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            while (dr.Read())
            {   // Read till the end of the data into a row
                Deal d = new Deal();
                Businesses b = new Businesses();
                d.Id = Convert.ToInt32(dr["id"]);
                d.Name = (string)dr["deal_name"];
                d.Business_Name = (string)dr["bname"];
                d.Business_id = Convert.ToInt32(dr["business_id"]);
                d.Startime = (TimeSpan)dr["startime"];
                d.Endtime = (TimeSpan)dr["endtime"];
                d.Image = (string)dr["image"];
                d.Description = (string)dr["description"];
                d.Discount = Convert.ToInt32(Convert.ToDouble(dr["discount"]) * 100);
                b.Latitude = Convert.ToDouble(dr["latitude"]);
                b.Longitude = Convert.ToDouble(dr["longitude"]);
                d.Bus_rest = b;


                DateTime now = DateTime.Now;

                DateTime end = DateTime.Today + d.Endtime;

                TimeSpan TimeToEndDeal = end - now;
                d.MinutesToend = Convert.ToInt32(TimeToEndDeal.TotalMinutes);

                dlist.Add(d);
                //string starttimeString24Hour = Convert.ToDateTime(context.Request.QueryString["starttime"]).ToString("HH:mm", CultureInfo.CurrentCulture);
                //string endtimeString24Hour = Convert.ToDateTime(context.Request.QueryString["endtime"]).ToString("HH:mm", CultureInfo.CurrentCulture);
                //edit.endtime = endtimeString24Hour;
            }

            return dlist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }

    }

    //return deals by rest
    public List<Deal> getDealsByRest(int rest_id)
    {
        List<Deal> dlist = new List<Deal>();
        SqlConnection con = null;

        string selectSTR = null;
        try
        {
            con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

            StringBuilder sb = new StringBuilder();

            sb.AppendFormat("SELECT dealInbus_2021.id, Businesses_2021.bname, dealInbus_2021.business_id as business_id,dealInbus_2021.startime, dealInbus_2021.endtime, dealInbus_2021.discount,  Deal_2021.image, Deal_2021.description, Deal_2021.name AS deal_name " +
                "FROM Businesses_2021 INNER JOIN" +
                " dealInbus_2021 ON Businesses_2021.bid = dealInbus_2021.business_id INNER JOIN Deal_2021 ON dealInbus_2021.deal_id = Deal_2021.id  " +
                "where dealInbus_2021.date=CONVERT(date, GETDATE()) and CONVERT(time, GETDATE()) BETWEEN dealInbus_2021.startime and dealInbus_2021.endtime AND dealInbus_2021.business_id=" + rest_id);
            selectSTR = sb.ToString();


            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            while (dr.Read())
            {   // Read till the end of the data into a row
                Deal d = new Deal();
                d.Id = Convert.ToInt32(dr["id"]);
                d.Name = (string)dr["deal_name"];
                d.Business_Name = (string)dr["bname"];
                d.Business_id = Convert.ToInt32(dr["business_id"]);
                d.Startime = (TimeSpan)dr["startime"];
                d.Endtime = (TimeSpan)dr["endtime"];
                d.Image = (string)dr["image"];
                d.Description = (string)dr["description"];
                d.Discount = Convert.ToInt32(Convert.ToDouble(dr["discount"]) * 100);

                DateTime now = DateTime.Now;

                DateTime end = DateTime.Today + d.Endtime;

                TimeSpan TimeToEndDeal = end - now;
                d.MinutesToend = Convert.ToInt32(TimeToEndDeal.TotalMinutes);
                dlist.Add(d);

            }

            return dlist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }

    }

    public List<Deal> getDealslastDeals(int cust_id)
    {
        List<Deal> dlist = new List<Deal>();
        SqlConnection con = null;

        string selectSTR = null;
        try
        {
            con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

            StringBuilder sb = new StringBuilder();

            sb.AppendFormat("SELECT TOP (10) dealIncust_2021.coupon ,dealInbus_2021.id, dealInbus_2021.business_id, dealInbus_2021.discount, dealInbus_2021.date, dealInbus_2021.endtime, " +
                "dealInbus_2021.startime, Deal_2021.description, Deal_2021.name as deal_name, Deal_2021.image,  Businesses_2021.bname " +
                "FROM  dealIncust_2021 INNER JOIN "+
                         "dealInbus_2021 ON dealIncust_2021.dealinbus_id = dealInbus_2021.id INNER JOIN "+
                         "Deal_2021 ON dealInbus_2021.deal_id = Deal_2021.id INNER JOIN "+
                         "Businesses_2021 ON dealInbus_2021.business_id = Businesses_2021.bid "+
                 "WHERE(dealIncust_2021.used = 'True') AND (dealIncust_2021.dealincust_id = " + cust_id+ ")  order by dealIncust_2021.timeusecoupon");

            selectSTR = sb.ToString();


            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            while (dr.Read())
            {   // Read till the end of the data into a row
                Deal d = new Deal();
                d.Id = Convert.ToInt32(dr["id"]);
                d.Business_Name = (string)dr["bname"];
                d.Business_id = Convert.ToInt32(dr["business_id"]);
                d.Startime = (TimeSpan)dr["startime"];
                d.Endtime = (TimeSpan)dr["endtime"];
                d.Image = (string)dr["image"];
                d.Description = (string)dr["description"];
                d.Discount = Convert.ToInt32(Convert.ToDouble(dr["discount"]) * 100);
                d.Name = (string)dr["deal_name"];
                d.Coupon = Convert.ToInt32(dr["coupon"]);
                //string starttimeString24Hour = Convert.ToDateTime(context.Request.QueryString["starttime"]).ToString("HH:mm", CultureInfo.CurrentCulture);
                //string endtimeString24Hour = Convert.ToDateTime(context.Request.QueryString["endtime"]).ToString("HH:mm", CultureInfo.CurrentCulture);
                //edit.endtime = endtimeString24Hour;

                DateTime now = DateTime.Now;

                DateTime end = DateTime.Today + d.Endtime;

                TimeSpan TimeToEndDeal = end - now;
                d.MinutesToend = Convert.ToInt32(TimeToEndDeal.TotalMinutes);
                dlist.Add(d);

            }

            return dlist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }

    }

    //קבלת פרטים מלאים על מבצע לפי  תז מבצע-Dealen
    public List<Deal> getDealsByDeal(int id)
    {
        List<Deal> dlist = new List<Deal>();
        SqlConnection con = null;

        string selectSTR = null;
        try
        {
            con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

            StringBuilder sb = new StringBuilder();

            sb.AppendFormat("SELECT dealInbus_2021.id, Businesses_2021.bid,Businesses_2021.bname,Businesses_2021.baddress, Businesses_2021.bphone," +
                " Businesses_2021.bmail, Businesses_2021.opentime, Businesses_2021.closetime, Businesses_2021.bimage, Businesses_2021.bdescription, " +
                "dealInbus_2021.business_id as business_id,dealInbus_2021.startime, dealInbus_2021.endtime, dealInbus_2021.discount," +
                " Deal_2021.image, Deal_2021.description, Deal_2021.name AS deal_name " +
                "FROM Businesses_2021 INNER JOIN dealInbus_2021 ON Businesses_2021.bid = dealInbus_2021.business_id INNER JOIN" +
                " Deal_2021 ON dealInbus_2021.deal_id = Deal_2021.id where dealInbus_2021.id=" + id);
            selectSTR = sb.ToString();


            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            while (dr.Read())
            {   // Read till the end of the data into a row
                Deal d = new Deal();
                Businesses b = new Businesses();

                b.Bid = Convert.ToInt32(dr["bid"]);
                b.Bname = (string)dr["bname"];
                b.Baddress = (string)dr["baddress"];
                b.Bphone = (string)dr["bphone"];
                b.Bmail = (string)dr["bmail"];
                b.Opentime = (TimeSpan)dr["opentime"];
                b.Closetime = (TimeSpan)dr["closetime"];
                b.Bimage = (string)dr["bimage"];
                b.Bdescription = (string)dr["bdescription"];

                d.Bus_rest = b;

                d.Id = Convert.ToInt32(dr["id"]);
                d.Name = (string)dr["deal_name"];
                d.Business_Name = (string)dr["bname"];
                d.Business_id = Convert.ToInt32(dr["business_id"]);
                d.Startime = (TimeSpan)dr["startime"];
                d.Endtime = (TimeSpan)dr["endtime"];
                d.Image = (string)dr["image"];
                d.Description = (string)dr["description"];
                d.Discount = Convert.ToInt32(Convert.ToDouble(dr["discount"]) * 100);

                DateTime now = DateTime.Now;

                DateTime end = DateTime.Today + d.Endtime;

                TimeSpan TimeToEndDeal = end - now;
                d.MinutesToend = Convert.ToInt32(TimeToEndDeal.TotalMinutes);
                dlist.Add(d);

            }

            return dlist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }

    }

    public List<Deal> CheckIsLike(int deal_id, int cust_id)
    {
        List<Deal> dlist = new List<Deal>();
        SqlConnection con = null;

        string selectSTR = null;
        try
        {
            con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

            StringBuilder sb = new StringBuilder();

            sb.AppendFormat("select islike " +
                            "from cust_like_2021 " +
                            "where cust_id = '" + cust_id + "' and dealInbus_id = '" + deal_id + "' ");
            selectSTR = sb.ToString();


            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            while (dr.Read())
            {   // Read till the end of the data into a row
                Deal d = new Deal();

                d.IsLike = (bool)dr["islike"];
                dlist.Add(d);

            }

            return dlist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }

    }
    public List<Deal> getDealsBySearch(string Letter)
    {
        List<Deal> dlist = new List<Deal>();
        SqlConnection con = null;

        string selectSTR = null;
        try
        {
            con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

            StringBuilder sb = new StringBuilder();

            sb.AppendFormat("SELECT db.id, b.bname, db.business_id as business_id,db.startime, db.endtime, db.discount, d.image, d.description, d.name AS deal_name " +
                            "FROM Businesses_2021 AS b INNER JOIN dealInbus_2021 AS db ON b.bid = db.business_id INNER JOIN Deal_2021 AS d ON " +
                            "db.deal_id = d.id INNER JOIN "+
                            "CatInDeal_2021 ON CatInDeal_2021.Deal_id = d.Id " +
                        "   INNER JOIN Category_2021 AS c ON CatInDeal_2021.cat_id = c.id " +
                            "WHERE b.bname LIKE '%"+Letter+"%' OR d.name LIKE '%"+Letter+"%' OR c.name LIKE '%"+Letter+"%'");


            selectSTR = sb.ToString();


            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            while (dr.Read())
            {   // Read till the end of the data into a row
                Deal d = new Deal();
                d.Id = Convert.ToInt32(dr["id"]);
                d.Name = (string)dr["deal_name"];
                d.Business_Name = (string)dr["bname"];
                d.Business_id = Convert.ToInt32(dr["business_id"]);
                d.Startime = (TimeSpan)dr["startime"];
                d.Endtime = (TimeSpan)dr["endtime"];
                d.Image = (string)dr["image"];
                d.Description = (string)dr["description"];
                d.Discount = Convert.ToInt32(Convert.ToDouble(dr["discount"]) * 100);

                DateTime now = DateTime.Now;

                DateTime end = DateTime.Today + d.Endtime;

                TimeSpan TimeToEndDeal = end - now;
                d.MinutesToend = Convert.ToInt32(TimeToEndDeal.TotalMinutes);
                dlist.Add(d);
                //string starttimeString24Hour = Convert.ToDateTime(context.Request.QueryString["starttime"]).ToString("HH:mm", CultureInfo.CurrentCulture);
                //string endtimeString24Hour = Convert.ToDateTime(context.Request.QueryString["endtime"]).ToString("HH:mm", CultureInfo.CurrentCulture);
                //edit.endtime = endtimeString24Hour;
            }

            return dlist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }

    }
    //List<Deal> dlist = new List<Deal>();
    //SqlConnection con = null;

    //string selectSTR = null;
    //try
    //{
    //    con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

    //    StringBuilder sb = new StringBuilder();

    //    sb.AppendFormat("SELECT  CASE WHEN d.description LIKE '%Letter%' THEN d.description" +
    //                     "WHEN  d.name LIKE '%Letter%' THEN  d.name" +
    //                     "WHEN c.name LIKE '%Letter%' THEN  c.name" +
    //                     "WHEN b.bdescription LIKE '%Letter%' THEN b.bdescription" +
    //                     "WHEN b.bname LIKE '%Letter%' THEN b.bname" +
    //                     "ELSE ''"+
    //                     "END"+
    //        " FROM Businesses_2021 AS b INNER JOIN dealInbus_2021 AS db ON b.bid = db.business_id INNER JOIN Deal_2021 AS d ON" +
    //        " db.deal_id = d.id INNER JOIN Category_2021 AS c ON d.cat_id = c.id");

    //    selectSTR = sb.ToString();


    //    SqlCommand cmd = new SqlCommand(selectSTR, con);

    //    // get a reader
    //    SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
    //    while (dr.Read())
    //    {   // Read till the end of the data into a row
    //        Deal d = new Deal();
    //        d.Id = Convert.ToInt32(dr["id"]);
    //        d.Business_Name = (string)dr["bname"];
    //        d.Business_id = Convert.ToInt32(dr["business_id"]);
    //        d.Category = (string)dr["catgeory_name"];
    //        d.Startime = (TimeSpan)dr["startime"];
    //        d.Endtime = (TimeSpan)dr["endtime"];
    //        d.Image = (string)dr["image"];
    //        d.Description = (string)dr["description"];
    //        d.Discount = Convert.ToInt32(Convert.ToDouble(dr["discount"]) * 100);
    //        d.Name = (string)dr["deal_name"];
    //        d.Coupon = Convert.ToInt32(dr["coupon"]);
    //        //string starttimeString24Hour = Convert.ToDateTime(context.Request.QueryString["starttime"]).ToString("HH:mm", CultureInfo.CurrentCulture);
    //        //string endtimeString24Hour = Convert.ToDateTime(context.Request.QueryString["endtime"]).ToString("HH:mm", CultureInfo.CurrentCulture);
    //        //edit.endtime = endtimeString24Hour;
    //        dlist.Add(d);

    //    }

    //    return dlist;
    //}
    //catch (Exception ex)
    //{
    //    // write to log
    //    throw (ex);
    //}
    //finally
    //{
    //    if (con != null)
    //    {
    //        con.Close();
    //    }

    //}





    public List<Deal> getTags()
    {
        List<Deal> dlist = new List<Deal>();
        SqlConnection con = null;

        string selectSTR = null;
        try
        {
            con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

            StringBuilder sb = new StringBuilder();

            sb.AppendFormat("select * from  Tags_2021");
            selectSTR = sb.ToString();


            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            while (dr.Read())
            {   // Read till the end of the data into a row
                Deal d = new Deal();
                d.Id = Convert.ToInt32(dr["Tag_Id"]);
                d.Name = (string)dr["name"];

                dlist.Add(d);
            }

            return dlist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }

    }

    //Search Deals by Tags
    public List<Deal> getDealsByTag(string TagName, List<string> res)
    {
        List<Deal> dlist = new List<Deal>();
        SqlConnection con = null;

        string selectSTR = null;

        string TagsNames = "";
        foreach (var item in res)
        {
            TagsNames += " Tags.[name] = '" + item + "' or";
        }
        TagsNames = TagsNames.Remove(TagsNames.Length - 2);


        try
        {
            con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

            StringBuilder sb = new StringBuilder();
            if (TagName != "")
            {
                sb.AppendFormat("select deals.id,Tags.[name], b.bname, deal.[name] as deal_name, deal.[description],deal.[image], deals.business_id, deals.discount, " +
                "deals.deal_id, deals.active, deals.startime, deals.endtime, deals.[date], b.latitude, b.longitude " +
                "from Businesses_2021 AS b inner join dealInbus_2021 as deals on b.bid = deals.business_id " +
                "inner join Deal_2021 as Deal on Deal.id = deals.deal_id " +
                "inner join TagsInDeals_2021 as TagDeal on deals.id = TagDeal.Deal_id " +
                "inner join Tags_2021 as Tags on TagDeal.Tag_Id = Tags.Tag_Id " +
                "where Tags.[name] = '" + TagName + "'  ");
            } else
            {
                sb.AppendFormat("select deals.id,Tags.[name], b.bname, deal.[name] as deal_name, deal.[description],deal.[image], deals.business_id, deals.discount, " +
                "deals.deal_id, deals.active, deals.startime, deals.endtime, deals.[date], b.latitude, b.longitude  " +
                "from Businesses_2021 AS b inner join dealInbus_2021 as deals on b.bid = deals.business_id " +
                "inner join Deal_2021 as Deal on Deal.id = deals.deal_id " +
                "inner join TagsInDeals_2021 as TagDeal on deals.id = TagDeal.Deal_id " +
                "inner join Tags_2021 as Tags on TagDeal.Tag_Id = Tags.Tag_Id " +
                "where " + TagsNames);
            }

            selectSTR = sb.ToString();


            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            while (dr.Read())
            {   // Read till the end of the data into a row
                Deal d = new Deal();
                Businesses b = new Businesses();

                //b.Bid = Convert.ToInt32(dr["business_id"]);
                //b.Bname = (string)dr["bname"];

                b.Latitude = Convert.ToDouble(dr["latitude"]);
                b.Longitude = Convert.ToDouble(dr["longitude"]);
                d.Bus_rest = b;

                d.Id = Convert.ToInt32(dr["id"]);
                d.Name = (string)dr["deal_name"];
                d.Business_Name = (string)dr["bname"];
                d.Business_id = Convert.ToInt32(dr["business_id"]);
                d.Startime = (TimeSpan)dr["startime"];
                d.Endtime = (TimeSpan)dr["endtime"];
                d.Image = (string)dr["image"];
                d.Description = (string)dr["description"];
                d.Discount = Convert.ToInt32(Convert.ToDouble(dr["discount"]) * 100);

                DateTime now = DateTime.Now;

                DateTime end = DateTime.Today + d.Endtime;

                TimeSpan TimeToEndDeal = end - now;
                d.MinutesToend = Convert.ToInt32(TimeToEndDeal.TotalMinutes);
                d.MinutesToend = Convert.ToInt32(TimeToEndDeal.TotalMinutes);
                dlist.Add(d);

            }

            return dlist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }

    }


    //פונקציה קבלת פרטי הקטגוריה-Dealen
    public List<Category> getCategory()
    {
        List<Category> clist = new List<Category>();
        SqlConnection con = null;

        string selectSTR = null;
        try
        {
            con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

            StringBuilder sb = new StringBuilder();

            sb.AppendFormat("SELECT id, name, image FROM Category_2021");
            selectSTR = sb.ToString();


            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            while (dr.Read())
            {   // Read till the end of the data into a row
                Category c = new Category();
                c.Id = Convert.ToInt32(dr["id"]);
                c.Name = (string)dr["name"];
                c.Image = (string)dr["image"];
                clist.Add(c);

            }

            return clist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }

    }


    // return category with active Deal

    public List<Category> getCategory_Active()
    {
        List<Category> clist = new List<Category>();
        SqlConnection con = null;

        string selectSTR = null;
        try
        {
            con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

            StringBuilder sb = new StringBuilder();

            sb.AppendFormat("SELECT distinct Category_2021.id, Category_2021.name, Category_2021.image " +
                "FROM  Category_2021 INNER JOIN CatInDeal_2021 ON Category_2021.id = CatInDeal_2021.Cat_id INNER JOIN Deal_2021 as D ON CatInDeal_2021.Deal_id = D.Id " +
                "INNER JOIN dealInbus_2021 as db on db.deal_id=D.id " +
                " WHERE db.date=CONVERT(date, GETDATE()) and CONVERT(time, GETDATE()) BETWEEN db.startime and db.endtime");
            selectSTR = sb.ToString();


            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            while (dr.Read())
            {   // Read till the end of the data into a row
                Category c = new Category();
                c.Id = Convert.ToInt32(dr["id"]);
                c.Name = (string)dr["name"];
                c.Image = (string)dr["image"];
                clist.Add(c);

            }

            return clist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }

    }

    //Use coupon - Business side
    public int UseCoupon(int coupon)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("DBConnectionString"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildCommusecoupon(coupon);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = Convert.ToInt32(cmd.ExecuteScalar());// execute the command
            try
            {

                String cStr1 = BuildInsertCommandData(coupon);      // helper method to build the insert string
                cmd = CreateCommand(cStr1, con);
                int numEffected2 = Convert.ToInt32(cmd.ExecuteScalar());
                return numEffected;

            }
            catch (Exception)
            {
                throw;
            }
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    private String BuildCommusecoupon(int coupon)
    {
        String command;
        command = "UPDATE dealIncust_2021 SET used = 'True',timeusecoupon = GETDATE() WHERE coupon = " + coupon;
        String get_id = "SELECT " + coupon + ";";
        command += get_id;

        return command;
    }




    public int UpdateRateDeal(int coupon, int rate)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("DBConnectionString"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildRatecoupon(coupon, rate);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = Convert.ToInt32(cmd.ExecuteScalar());// execute the command
            try
            {

                String cStr1 = BuildUpdateRateCommandData(coupon, rate);      // helper method to build the insert string
                cmd = CreateCommand(cStr1, con);
                int numEffected2 = Convert.ToInt32(cmd.ExecuteScalar());
                return numEffected;

            }
            catch (Exception)
            {
                throw;
            }
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    private String BuildRatecoupon(int coupon, int rate)
    {
        String command;
        command = "UPDATE dealIncust_2021 SET rate= "+rate+" WHERE coupon = " + coupon;
        String get_id = "SELECT " + coupon + ";";
        command += get_id;

        return command;
    }

    private String BuildUpdateRateCommandData(int coupon, int rate)
    {
        String command;
        command = "UPDATE DataOfCust_2021 SET Rate= " + rate + " WHERE coupon = " + coupon;
        String get_id = "SELECT " + coupon + ";";
        command += get_id;

        return command;
    }






    //Insert data after user coupon
    private String BuildInsertCommandData(int coupon)
    {
        String command;

        command = "INSERT INTO DataOfCust_2021 " +
        "SELECT dic.coupon, d.id, dic.dealincust_id, dib.business_id, b.btype, dib.discount, cd.Cat_id,DATEPART(dw,GETDATE()) AS Date,  CONVERT (TIME, GETDATE()) AS Time ,  " +
             "CASE WHEN dic.distance BETWEEN 0 AND 500 THEN 1 " +
             "WHEN dic.distance BETWEEN 0 AND 500 THEN 1 " +
             "WHEN dic.distance BETWEEN 500 AND 1000 THEN 2 " +
             "WHEN dic.distance BETWEEN 1000 AND 1500 THEN 3 " +
             "WHEN dic.distance BETWEEN 1500 AND 2000 THEN 4 " +
             "WHEN dic.distance BETWEEN 2000 AND 2500 THEN 5 " +
             "WHEN dic.distance BETWEEN 2500 AND 3500 THEN 6 " +
             "WHEN dic.distance BETWEEN 3500 AND 4500 THEN 7 " +
             "WHEN dic.distance BETWEEN 4500 AND 10000 THEN 8 " +
             "WHEN dic.distance > 10000 THEN 9 ELSE 0 END AS dist_id , NULL " +
            "FROM dealIncust_2021 AS dic INNER JOIN dealinbus_2021 AS dib ON dic.dealinbus_id=dib.id " +
            "INNER JOIN Businesses_2021 AS b ON b.bid=dib.business_id " +
            "INNER JOIN Deal_2021 AS d ON dib.deal_id=d.id " +
            "INNER JOIN CatInDeal_2021 AS cd ON cd.Deal_id=d.id " +
            "WHERE dic.coupon=" + coupon + " AND dic.Used='True'";
        String get_id = "SELECT SCOPE_IDENTITY();";
        command += get_id;



        return command;
    }


    //cancel Deala pproval
    public int CancelDeal(int coupon)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("DBConnectionString"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildCommcancelDeal(coupon);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {

            int numEffected = cmd.ExecuteNonQuery();
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    private String BuildCommcancelDeal(int coupon)
    {
        String command;
        command = "UPDATE dealIncust_2021 SET canceldeal = 'True' WHERE coupon = '" + coupon.ToString() + "'";
        return command;
    }


    //Like Unlike Deal
    public int LikeDeal(int coupon, bool islike, bool isbefore, int cust_id, int deal_id)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("DBConnectionString"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildCommlikedeal(coupon, islike, isbefore, cust_id, deal_id);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery();// execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    private String BuildCommlikedeal(int coupon, bool islike, bool isbefore, int cust_id, int deal_id)
    {
        String command;
        StringBuilder sb = new StringBuilder();
        if (isbefore && islike && coupon != 1)
        {
            sb.AppendFormat("Values({0}, {1}, '{2}');", cust_id, deal_id, isbefore);
            String prefixc = "INSERT INTO [cust_like_2021] " + "([cust_id],[dealInbus_id],[isLike])";
            command = prefixc + sb.ToString();
        }
        else if (isbefore && islike && coupon == 1)
        {
            command = "UPDATE cust_like_2021 SET isLike = '" + islike + "' WHERE cust_id = " + cust_id + "AND dealInbus_id = " + deal_id;
        }
        else if (isbefore && islike == false)
        {
            command = "UPDATE cust_like_2021 SET isLike = '" + islike + "' WHERE cust_id = " + cust_id + "AND dealInbus_id = " + deal_id;
        }
        else
        {
            command = "UPDATE dealIncust_2021 SET liked = '" + islike + "' WHERE coupon = " + coupon;
        }
        return command;
    }




    //convert date time
    private static void ConvertToDateTime(string value)
    {
        DateTime convertedDate;
        try
        {
            convertedDate = Convert.ToDateTime(value);
            Console.WriteLine("'{0}' converts to {1} {2} time.",
                              value, convertedDate,
                              convertedDate.Kind.ToString());
        }
        catch (FormatException)
        {
            Console.WriteLine("'{0}' is not in the proper format.", value);
        }
    }


    public List<Deal> getRecommendSDeals(int cust_id, float latitude, float longitude)
    {
        List<Deal> dlist = new List<Deal>();
        SqlConnection con = null;

        var prametre = new List<string>() { "Type_Bus" , "Id_Cat", "Dist_id",  };
        var all_results = new Dictionary<string, int>() { };

        string selectSTR = null;
        try
        {
            con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file
            foreach (string p in prametre)
            {
                StringBuilder sb = new StringBuilder();
                sb.AppendFormat("select top 1 count (distinct coupon) as num " +
                "from DataOfCust_2021 " +
                "where Id_Dealincust = '"+cust_id+"' "+
                "group by " + p + " order by count(coupon) DESC; ");

                selectSTR = sb.ToString();
                SqlCommand cmd_cat = new SqlCommand(selectSTR, con);
              //  SqlDataReader d = cmd_cat.ExecuteReader(CommandBehavior.CloseConnection);
       
                var result = Convert.ToInt32(cmd_cat.ExecuteScalar());
                all_results.Add(p, result); 
            };

            //string max_param = all_results.Aggregate((l, r) => l.Value > r.Value ? l : r).Key;
            IEnumerable<KeyValuePair<string, int>> sorted_results = all_results.OrderByDescending(r => r.Value);

            int[,] matrix = new int[6, 3];
            int current_index = 0;
            
            foreach (KeyValuePair<string, int> item in sorted_results)
            {
                var Weight_per_value = new Dictionary<int, int>() { };
                string dis = "distinct";
                string max_param = item.Key;
                if (max_param == "Id_Cat")
                    dis = "";

                StringBuilder sb2 = new StringBuilder();
                sb2.AppendFormat("select " + max_param + ", round(('6' * (COUNT( coupon) * 100 / (select COUNT(" + dis + " coupon) from DataOfCust_2021 where Id_Dealincust = '" + cust_id + "' )) / 100.0),0,0) AS SIT " +
                "from(select "+dis+" (coupon), "+ max_param + " from DataOfCust_2021 where Id_Dealincust = '53') AS D "+
                "group by " + max_param + " order by count(coupon) DESC");

                selectSTR = sb2.ToString();
                SqlCommand cmd_param = new SqlCommand(selectSTR, con);
                SqlDataReader dr = cmd_param.ExecuteReader();
                while (dr.Read())
                {
                    Weight_per_value.Add(Convert.ToInt32(dr[max_param]), Convert.ToInt32(dr["SIT"]));
                }
                dr.Close();

                // int j_pram = prametre.IndexOf(prametre.Single(i => i.Contains(max_param)));
                int j_pram = current_index++;
                int i = 0;
                foreach (KeyValuePair<int, int> entry in Weight_per_value)
                {
                    for (int j = 0; j < entry.Value; j++)
                        matrix[i++, j_pram] = entry.Key;
                }
            }
            int index_dist = sorted_results.Select(x => x.Key).ToList().FindIndex(x => x == "Dist_id");
            int index_type = sorted_results.Select(x => x.Key).ToList().FindIndex(x => x == "Type_Bus");
            int index_cat = sorted_results.Select(x => x.Key).ToList().FindIndex(x => x == "Id_Cat");

            for (int i=0; i < matrix.GetLength(0); i++) 
            {
                StringBuilder sb3 = new StringBuilder();
                
                sb3.AppendFormat("SELECT db.id, d.name AS deal_name, db.business_id, b.bname, db.startime, db.endtime, db.discount, " +
                "round ((SELECT geography::Point(" + latitude + ", " + longitude + ", 4326).STDistance(geography::Point(b.latitude, b.longitude, 4326))),0) AS Distance, "+
                "c.name AS catgeory_name, cd.cat_id as cat_id, d.image, d.description " +
                "FROM Businesses_2021 AS b INNER JOIN dealInbus_2021 AS db ON b.bid = db.business_id " +
                "INNER JOIN Deal_2021 AS d ON db.deal_id = d.id INNER JOIN CatInDeal_2021 AS cd ON cd.Deal_id = d.Id " +
                "INNER JOIN Category_2021 AS c ON cd.Cat_id = c.id " +
                "WHERE 1 = 1 " +
                "AND cd.cat_id = '" + matrix[i, index_cat]+"' "+
                "AND b.btype =  '" + matrix[i, index_type]+ "' " +
                "AND(SELECT geography::Point(" + latitude + ", " + longitude + ", 4326).STDistance(geography::Point(b.latitude, b.longitude, 4326))) < (select max from Distance_2021 where dist_id = '" + matrix[i, index_dist] + "') " +
                //"AND(SELECT geography::Point(" + latitude + ", " + longitude + ", 4326).STDistance(geography::Point(b.latitude, b.longitude, 4326))) between(select min from Distance_2021 where dist_id = '" + matrix[i, index_dist] + "') AND(select max from Distance_2021 where dist_id = '" + matrix[i, index_dist] + "') " +
                "--AND db.date = CONVERT(date, GETDATE()) and CONVERT(time, GETDATE()) BETWEEN db.startime and db.endtime " +
                "order by discount DESC");

                selectSTR = sb3.ToString();
                SqlCommand cmd = new SqlCommand(selectSTR, con);
                SqlDataReader dr2 = cmd.ExecuteReader(); 
                while (dr2.Read())
                {   
                    Deal d = new Deal();
                    d.Id = Convert.ToInt32(dr2["id"]);
                    d.Business_Name = (string)dr2["bname"];
                    d.Business_id = Convert.ToInt32(dr2["business_id"]);
                    d.Category = (string)dr2["catgeory_name"];
                    d.Startime = (TimeSpan)dr2["startime"];
                    d.Endtime = (TimeSpan)dr2["endtime"];
                    d.Image = (string)dr2["image"];
                    d.Description = (string)dr2["description"];
                    d.Discount = Convert.ToInt32(Convert.ToDouble(dr2["discount"]) * 100);
                    d.Name = (string)dr2["deal_name"];
                    DateTime now = DateTime.Now;
                    DateTime end = DateTime.Now + d.Endtime;
                    TimeSpan TimeToEndDeal = end - now;
                    d.MinutesToend = Convert.ToInt32(TimeToEndDeal.TotalMinutes);
                    if (!dlist.Where(p => p.Id == d.Id).Any())
                        dlist.Add(d);
                }
                dr2.Close();

            }

            return dlist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }

    }
    //Rrport
    //get all DataCard
    public List<RedeemCard> GetDataCard(int Bus_Id)
    {
        List<RedeemCard> dcard = new List<RedeemCard>();
        SqlConnection con = null;
            
        string selectSTR = null;
        try
        {
            con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

            StringBuilder sb = new StringBuilder();

            sb.AppendFormat(" select  count(distinct dealInbus_id) AS 'Count deal', count(distinct coupon) / count(distinct dealInbus_id) AS  'Avg Redeem deal', "+
                           " round(SUM(Rate) * 1.0 / COUNT(dealInbus_id), 1) AS 'Avg Rate', "+
                           " (Select COUNT(Id_Dealincust)  from(Select count(Id_Dealincust) as c, Id_Dealincust "+
                           " from DataOfCust_2021 "+
                           " group by Id_Dealincust) AS D "+
                           " where c = '1' ) AS 'New Customers', "+
                           " ( select top 1 Deal.name from dealInbus_2021 AS B LEFT JOIN DataOfCust_2021 as D ON B.id = D.dealInbus_id "+
                           " join Deal_2021 AS Deal ON deal.Id = b.deal_id where d.dealInbus_id is NULL AND B.business_id ="+ Bus_Id +
                           " order by b.deal_id DESC ) AS 'Non Redeemed Deal' " +
                           " from DataOfCust_2021 "+
                           "  where Id_Business = "+ Bus_Id);

            selectSTR = sb.ToString();


            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            while (dr.Read())
            {   // Read till the end of the data into a row
                RedeemCard d = new RedeemCard();
                d.Count_deal = Convert.ToInt32(dr["Count deal"]);
                d.Avg_redeem_deal = Convert.ToInt32(Convert.ToDouble(dr["Avg Redeem deal"]));
                d.Avg_rate = Convert.ToInt32(Convert.ToDouble(dr["Avg Rate"]));
                d.New_customers = Convert.ToInt32(dr["New Customers"]);
                d.Non_redemmed_deal = (string)dr["Non Redeemed Deal"];

                dcard.Add(d);
            }


            return dcard;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }

    }

    public List<List<RedeemCard>> GetDealByDate(int Bus_Id)
    {
        List<RedeemCard> current_month = new List<RedeemCard>();
        List<RedeemCard> last_month = new List<RedeemCard>();
        List<List<RedeemCard>> results = new List<List<RedeemCard>>();
        SqlConnection con = null;

        string selectSTR = null;
        try
        {
            con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

            StringBuilder sb = new StringBuilder();

            sb.AppendFormat(" select Dib.date AS Date, day(dib.date) AS Day, coupon AS Coupon, DealN.deal_id AS Deal_id from dealInbus_2021 AS Dib RIGHT JOIN " +
                            " (select dib.deal_id, count(coupon) AS coupon  from DataOfCust_2021 AS DCUST INNER JOIN dealInbus_2021 AS Dib ON DCUST.dealInbus_id = Dib.id "+
                            " where business_id = "+ Bus_Id +
                            " group by dib.deal_id "+
                            " ) AS DealN ON DealN.deal_id = Dib.deal_id "+
                            " where dib.business_id ="+ Bus_Id+" AND MONTH(Dib.date) = MONTH(GETDATE()) "+
                            " order by Dib.date");

            selectSTR = sb.ToString();


            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            while (dr.Read())
            {   // Read till the end of the data into a row
                RedeemCard d = new RedeemCard();
                d.Deal_id = Convert.ToInt32(dr["Deal_id"]);
                d.Day = Convert.ToInt32(dr["Day"]);
                d.Coupon = Convert.ToInt32(dr["Coupon"]);
                d.Date = (DateTime)dr["Date"];

                current_month.Add(d);
            }
            results.Add(current_month);


            sb = new StringBuilder();
            sb.AppendFormat(" select Dib.date AS Date, day(dib.date) AS Day, coupon AS Coupon, DealN.deal_id AS Deal_id from dealInbus_2021 AS Dib RIGHT JOIN " +
                            " (select dib.deal_id, count(coupon) AS coupon  from DataOfCust_2021 AS DCUST INNER JOIN dealInbus_2021 AS Dib ON DCUST.dealInbus_id = Dib.id " +
                            " where business_id = " + Bus_Id +
                            " group by dib.deal_id " +
                            " ) AS DealN ON DealN.deal_id = Dib.deal_id " +
                            " where dib.business_id =" + Bus_Id + " AND MONTH(Dib.date) = MONTH(GETDATE())-1 " +
                            " order by Dib.date");

            selectSTR = sb.ToString();


            
            dr.Close();
            con.Close();
            con = connect("DBConnectionString");
            cmd = new SqlCommand(selectSTR, con);
            // get a reader
            dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            while (dr.Read())
            {   // Read till the end of the data into a row
                RedeemCard d = new RedeemCard();
                d.Deal_id = Convert.ToInt32(dr["Deal_id"]);
                d.Day = Convert.ToInt32(dr["Day"]);
                d.Coupon = Convert.ToInt32(dr["Coupon"]);
                d.Date = (DateTime)dr["Date"];

                last_month.Add(d);
            }
            results.Add(last_month);

            return results;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }
    }

    public List<Deal> GetAllDeals(int Bus_Id)
    {
        List<Deal> dlist = new List<Deal>();
        SqlConnection con = null;

        string selectSTR = null;
        try
        {

            con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file
            StringBuilder sb = new StringBuilder();

            sb.AppendFormat("select Distinct(D.Id) AS 'Deal Id', D.name As 'Name Deal',D.Product As 'Prodact', "+
                            "D.description As 'Description Deal', Dib.date As 'Date', Dib.startime As 'Startime', Dib.endtime As 'Endtime', DCUST.coupon "+
                            "from(select dealInbus_Id, count(coupon) AS 'coupon' from DataOfCust_2021 where Id_Business ="+ Bus_Id + "group by dealInbus_id) AS DCUST RIGHT JOIN dealInbus_2021 AS Dib "+
                            "ON DCUST.dealInbus_Id = Dib.id INNER JOIN Deal_2021 AS D ON D.Id = Dib.deal_id "+
                            "where business_id = "+ Bus_Id);
            selectSTR = sb.ToString();



            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            while (dr.Read())
            {   // Read till the end of the data into a row
                Businesses b = new Businesses();
                Deal d = new Deal();
                d.Id = Convert.ToInt32(dr["id"]);
                d.Name = (string)dr["deal_name"];
                d.Description = (string)dr["description"];
                d.Prodact = (string)dr["Prodact"];
                d.Date = (DateTime)dr["date"];
                d.Startime = (TimeSpan)dr["startime"];
                d.Endtime = (TimeSpan)dr["endtime"];
                d.Coupon = Convert.ToInt32(dr["coupon"]);
                d.Bus_rest = b;

                DateTime now = DateTime.Now;

                DateTime end = DateTime.Today + d.Endtime;

                TimeSpan TimeToEndDeal = end - now;
                d.MinutesToend = Convert.ToInt32(TimeToEndDeal.TotalMinutes);


                dlist.Add(d);
            }

            return dlist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }

    }


}