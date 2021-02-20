using System;
using System.Data.SqlClient;
using System.Web.Configuration;
using System.Data;
using System.Text;
using System.Collections.Generic;
using DealenServerSide.Models;
using System.Globalization;


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

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values('{0}', '{1}','{2}','{3}', '{4}','{5}','{6}','{7}','{8}','{9}');", businesses.Bname, businesses.Baddress, businesses.Bphone, businesses.Manager,businesses.Bmail, businesses.Password,businesses.Opentime,businesses.Closetime, businesses.Bimage, businesses.Bdescription);
        String prefixc = "INSERT INTO [Businesses_2021] " + "([bname],[baddress],[bphone],[manager],[bmail],[password],[opentime],[closetime],[bimage],[bdescription])";
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
                String cStr1 = BuildInsertCommandlink(deal,numEffected);      // helper method to build the insert string
                cmd = CreateCommand(cStr, con);
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
    //בניית קריאה להכנסה למבצע
    private String BuildInsertCommand(Deal deal)
    {
        String command;
        command = "";

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values('{0}', '{1}','{2}',{3});", deal.Name, deal.Description, deal.Image, deal.Cat_id);
        String prefixc = "INSERT INTO [Deal_2021] " + "([name],[description],[image],[cat_id])";
        String get_id = "SELECT SCOPE_IDENTITY();";
        command = prefixc + sb.ToString() + get_id;

        return command;
        
    }

    // לבניית קריאה לטבלה מקשרת של מבצעים ובעלי עסקים Dealen
    private String BuildInsertCommandlink(Deal deal,int deal_id)
    {
        String command;
        command = "";

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values({0}, {1},{2},{3});", deal.Business_id, deal_id, deal.Discount, deal.Startime,deal.Endtime);
        String prefixc = "INSERT INTO [dealInbus_2021] " + "([business_id],[deal_id],[discount],[startime],[endtime])";
        String get_id = "SELECT SCOPE_IDENTITY();";
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

            String selectSTR = "select cust_id,[cust_fname],[cust_lname],cust_address,cust_phone,birthdate,cust_mail, password,[image] from Customer_2021 where cust_mail = '" + mail.ToString()+ "' and [password] = '" +password.ToString() + "'";
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
                b.Baddress= (string)dr["baddress"];
                b.Bphone = (string)dr["bphone"];
                b.Manager = (string)dr["manager"];
                b.Bmail = (string)dr["bmail"];
                b.Password = (string)dr["password"];
                b.Opentime = (TimeSpan)dr["opentime"];
                b.Closetime = (TimeSpan)dr["closetime"];
                b.Bimage = (string)dr["bimage"];
                b.Bdescription= (string)dr["bdescription"];



          
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

                sb.AppendFormat(" SELECT dealInbus_2021.id,dealInbus_2021.business_id, Businesses_2021.bname, dealInbus_2021.startime, dealInbus_2021.endtime, dealInbus_2021.discount, Category_2021.name AS catgeory_name, Deal_2021.image, Deal_2021.description, Deal_2021.name AS deal_name, Deal_2021.cat_id as cat_id  FROM Businesses_2021 INNER JOIN dealInbus_2021 ON Businesses_2021.bid = dealInbus_2021.business_id INNER JOIN Deal_2021 ON dealInbus_2021.deal_id = Deal_2021.id INNER JOIN Category_2021 ON Deal_2021.cat_id = Category_2021.id");
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
                d.Business_id= Convert.ToInt32(dr["business_id"]);
                d.Category = (string)dr["catgeory_name"];
                d.Cat_id= Convert.ToInt32(dr["cat_id"]);
                d.Startime = Convert.ToDateTime(dr["startime"]).TimeOfDay;
                d.Endtime = Convert.ToDateTime(dr["endtime"]).TimeOfDay;
                d.Image = (string)dr["image"];
                d.Description = (string)dr["description"];
                d.Discount = Convert.ToInt32(Convert.ToDouble(dr["discount"]) * 100);

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
    public List<Deal> getDealsByCat( int cat_id)
    {
        List<Deal> dlist = new List<Deal>();
        SqlConnection con = null;

        string selectSTR = null;
        try
        {
            con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

            StringBuilder sb = new StringBuilder();

            sb.AppendFormat("SELECT dealInbus_2021.id, Businesses_2021.bname, dealInbus_2021.business_id as business_id,dealInbus_2021.startime, dealInbus_2021.endtime, dealInbus_2021.discount, Category_2021.name AS catgeory_name, Deal_2021.image, Deal_2021.description, Deal_2021.name AS deal_name, Deal_2021.cat_id as cat_id FROM Businesses_2021 INNER JOIN dealInbus_2021 ON Businesses_2021.bid = dealInbus_2021.business_id INNER JOIN Deal_2021 ON dealInbus_2021.deal_id = Deal_2021.id INNER JOIN Category_2021 ON Deal_2021.cat_id = Category_2021.id where Deal_2021.cat_id=" + cat_id);
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
                d.Cat_id = Convert.ToInt32(dr["cat_id"]);
                d.Startime = Convert.ToDateTime(dr["startime"]).TimeOfDay;
                d.Endtime = Convert.ToDateTime(dr["endtime"]).TimeOfDay;
                d.Image = (string)dr["image"];
                d.Description = (string)dr["description"];
                d.Discount = Convert.ToInt32(Convert.ToDouble(dr["discount"])*100);
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

            sb.AppendFormat("SELECT dealInbus_2021.id, Businesses_2021.bid,Businesses_2021.bname,Businesses_2021.baddress, Businesses_2021.bphone, Businesses_2021.bmail, Businesses_2021.opentime, Businesses_2021.closetime, Businesses_2021.bimage, Businesses_2021.bdescription, dealInbus_2021.business_id as business_id,dealInbus_2021.startime, dealInbus_2021.endtime, dealInbus_2021.discount, Category_2021.name AS catgeory_name, Deal_2021.image, Deal_2021.description, Deal_2021.name AS deal_name, Deal_2021.cat_id as cat_id FROM Businesses_2021 INNER JOIN dealInbus_2021 ON Businesses_2021.bid = dealInbus_2021.business_id INNER JOIN Deal_2021 ON dealInbus_2021.deal_id = Deal_2021.id INNER JOIN Category_2021 ON Deal_2021.cat_id = Category_2021.id where dealInbus_2021.id=" + id);
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
                d.Category = (string)dr["catgeory_name"];
                d.Cat_id = Convert.ToInt32(dr["cat_id"]);
                d.Startime = Convert.ToDateTime(dr["startime"]).TimeOfDay;
                d.Endtime = Convert.ToDateTime(dr["endtime"]).TimeOfDay;
                d.Image = (string)dr["image"];
                d.Description = (string)dr["description"];
                d.Discount = Convert.ToInt32(Convert.ToDouble(dr["discount"]) * 100);
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
}

