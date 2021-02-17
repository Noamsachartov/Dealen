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



    //הכנסת לקוח קיים- Dealen
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
        sb.AppendFormat("Values('{0}', '{1}','{2}','{3}', '{4}', '{5}','{6}');", customer.Cust_name, customer.Cust_address, customer.Cust_phone, customer.Cust_mail, customer.Birthdate, customer.Password, customer.Image);
        String prefixc = "INSERT INTO [Customer_2021] " + "([cust_name],[cust_address],[cust_phone],[cust_mail],[birthdate],[password],[image])";
        String get_id = "SELECT SCOPE_IDENTITY();";
        command = prefixc + sb.ToString() + get_id;

        return command;
    }
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
    //--------------------------------------------------------------------
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
    private String BuildInsertCommandlink(Deal deal,int deal_id)
    {
        String command;
        command = "";

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values({0}, {1},{2},{3});", deal.Business_id, deal_id, deal.Discount, deal.Startime,deal.Endtime);
        String prefixc = "INSERT INTO [Deal_2021] " + "([business_id],[deal_id],[discount],[startime],[endtime])";
        String get_id = "SELECT SCOPE_IDENTITY();";
        command = prefixc + sb.ToString() + get_id;

        return command;
        


    }



    //Insert New Campaingn
    //--------------------------------------------------------------------


    //Insert Insert_Att_In_Rest
    //public int Insert_Att_In_Rest(Attribute_In_rest attribute_In_Rest)
    //{

    //    SqlConnection con;
    //    SqlCommand cmd;

    //    try
    //    {
    //        con = connect("DBConnectionString"); // create the connection
    //    }
    //    catch (Exception ex)
    //    {
    //        // write to log
    //        throw (ex);
    //    }

    //    String cStr = BuildInsertCommand(attribute_In_Rest);      // helper method to build the insert string

    //    cmd = CreateCommand(cStr, con);             // create the command

    //    try
    //    {
    //        int numEffected = cmd.ExecuteNonQuery(); // execute the command
    //        return numEffected;
    //    }
    //    catch (Exception ex)
    //    {
    //        // write to log
    //        throw (ex);
    //    }

    //    finally
    //    {
    //        if (con != null)
    //        {
    //            // close the db connection
    //            con.Close();
    //        }
    //    }

    //}
    //--------------------------------------------------------------------
    //private String BuildInsertCommand(Attribute_In_rest attribute_In_Rest)
    //{
    //    String command;

    //    StringBuilder sb = new StringBuilder();
    //    // use a string builder to create the dynamic string
    //    sb.AppendFormat("Values({0}, {1})", attribute_In_Rest.Id_attr, attribute_In_Rest.Id_rest);
    //    String prefixc = "INSERT INTO [Attribute_rest_2021] " + "([Id_attribute],[Id_rest])";
    //    command = prefixc + sb.ToString();

    //    return command;
    //}


    //Insert Attribute_att_In_cust
    //public int Attribute_att_In_cust(Attribute_In_cust attribute_In_cust)
    //{

    //    SqlConnection con;
    //    SqlCommand cmd;

    //    try
    //    {
    //        con = connect("DBConnectionString"); // create the connection
    //    }
    //    catch (Exception ex)
    //    {
    //        // write to log
    //        throw (ex);
    //    }

    //    String cStr = BuildInsertCommand(attribute_In_cust);      // helper method to build the insert string

    //    cmd = CreateCommand(cStr, con);             // create the command

    //    try
    //    {
    //        int numEffected = cmd.ExecuteNonQuery(); // execute the command
    //        return numEffected;
    //    }
    //    catch (Exception ex)
    //    {
    //        // write to log
    //        throw (ex);
    //    }

    //    finally
    //    {
    //        if (con != null)
    //        {
    //            // close the db connection
    //            con.Close();
    //        }
    //    }

    //}
    //--------------------------------------------------------------------
    //private String BuildInsertCommand(Attribute_In_cust attribute_In_cust)
    //{
    //    String command;

    //    StringBuilder sb = new StringBuilder();
    //    // use a string builder to create the dynamic string
    //    sb.AppendFormat("Values({0}, {1})", attribute_In_cust.Id_att, attribute_In_cust.Id_cust);
    //    String prefixc = "INSERT INTO [Attribute_Cust_2021] " + "([Id_attribute],[Id_cust])";
    //    command = prefixc + sb.ToString();

    //    return command;
    //}
    //Delete Attribute_att_In_cust
    //public int Attribute_att_In_cust_Delete(int id)
    //{

    //    SqlConnection con;
    //    SqlCommand cmd;

    //    try
    //    {
    //        con = connect("DBConnectionString"); // create the connection
    //    }
    //    catch (Exception ex)
    //    {
    //        // write to log
    //        throw (ex);
    //    }

    //    String cStr = BuildInsertCommand(id);      // helper method to build the insert string

    //    cmd = CreateCommand(cStr, con);             // create the command

    //    try
    //    {
    //        int numEffected = cmd.ExecuteNonQuery(); // execute the command
    //        return numEffected;
    //    }
    //    catch (Exception ex)
    //    {
    //        // write to log
    //        throw (ex);
    //    }

    //    finally
    //    {
    //        if (con != null)
    //        {
    //            // close the db connection
    //            con.Close();
    //        }
    //    }

    //}
    //--------------------------------------------------------------------
    //private String BuildInsertCommand(int id)
    //{
    //    String command;

    //    StringBuilder sb = new StringBuilder();
    //    // use a string builder to create the dynamic string
    //    sb.AppendFormat("{0}", id);
    //    String prefixc = "DELETE FROM Attribute_Cust_2021 WHERE Id_cust=";
    //    command = prefixc + sb.ToString();

    //    return command;
    //}

    //update Attribute_att_In_cust_Update

    //public int Attribute_att_In_cust_Update(Attribute_In_cust attribute_In_cust)
    //{
    //    SqlConnection con;
    //    SqlCommand cmd;

    //    try
    //    {
    //        con = connect("DBConnectionString"); // create the connection
    //    }
    //    catch (Exception ex)
    //    {
    //        // write to log
    //        throw (ex);
    //    }

    //    String cStr = BuildInsertCommand2(attribute_In_cust);      // helper method to build the insert string
    //    cmd = CreateCommand(cStr, con);             // create the command

    //    try
    //    {
    //        int numEffected = cmd.ExecuteNonQuery(); // execute the command
    //        return numEffected;
    //    }
    //    catch (Exception ex)
    //    {
    //        // write to log
    //        throw (ex);
    //    }

    //    finally
    //    {
    //        if (con != null)
    //        {
    //            // close the db connection
    //            con.Close();
    //        }
    //    }

    //}
    //--------------------------------------------------------------------
    //private String BuildInsertCommand2(Attribute_In_cust attribute_In_cust)
    //{
    //    String command;

    //    StringBuilder sb = new StringBuilder();
    //    // use a string builder to create the dynamic string
    //    sb.AppendFormat("Values({0}, {1})", attribute_In_cust.Id_att, attribute_In_cust.Id_cust);
    //    String prefixc = "INSERT INTO Attribute_Cust_2021 " + "(Id_attribute, Id_cust) ";
    //    command = prefixc + sb.ToString();

    //    return command;
    //}




    //Update Budget of Campaign by id
    //public int Update_Budget(int id, int budget)
    //{

    //    SqlConnection con;
    //    SqlCommand cmd;

    //    try
    //    {
    //        con = connect("DBConnectionString"); // create the connection
    //    }
    //    catch (Exception ex)
    //    {
    //        // write to log
    //        throw (ex);
    //    }

    //    String cStr = BuildUpdateCommand(id, budget);      // helper method to build the insert string

    //    cmd = CreateCommand(cStr, con);             // create the command

    //    try
    //    {
    //        int numEffected = cmd.ExecuteNonQuery(); // execute the command
    //        return numEffected;
    //    }
    //    catch (Exception ex)
    //    {
    //        // write to log
    //        throw (ex);
    //    }

    //    finally
    //    {
    //        if (con != null)
    //        {
    //            // close the db connection
    //            con.Close();
    //        }
    //    }

    //}
    //--------------------------------------------------------------------
    //private String BuildUpdateCommand(int id, int difference)
    //{
    //    String command;
    //    command = "UPDATE campaingn_2021 SET budget = budget + " + difference + " ,balance = balance + " + difference + " WHERE id = " + id + "; ";
    //    return command;
    //}

    ////Delete Campaign by id - change status to false
    //public int DeleteCampain(int id)
    //{

    //    SqlConnection con;
    //    SqlCommand cmd;

    //    try
    //    {
    //        con = connect("DBConnectionString"); // create the connection
    //    }
    //    catch (Exception ex)
    //    {
    //        // write to log
    //        throw (ex);
    //    }

    //    String cStr = BuildUpdateCommand(id);      // helper method to build the insert string

    //    cmd = CreateCommand(cStr, con);             // create the command

    //    try
    //    {
    //        int numEffected = cmd.ExecuteNonQuery(); // execute the command
    //        return numEffected;
    //    }
    //    catch (Exception ex)
    //    {
    //        // write to log
    //        throw (ex);
    //    }

    //    finally
    //    {
    //        if (con != null)
    //        {
    //            // close the db connection
    //            con.Close();
    //        }
    //    }

    //}
    ////--------------------------------------------------------------------
    //private String BuildUpdateCommand(int id)
    //{
    //    String command;
    //    command = "UPDATE campaingn_2021 SET status = 'False',balance = budget, num_clicks = 0,num_views=0 WHERE id = " + id + "; ";
    //    return command;
    //}
    //private String BuildUpdateStatusCommand(Campaign c)
    //{ 
    //    String command;
    //    command = "UPDATE campaingn_2021 SET status = 'True',budget = " + c.Budget+ ",balance = " + c.Budget + ", num_clicks = 0,num_views=0 WHERE id_rest = " + c.Id_rest + "; ";
    //    return command;
    //}





    //פונקציה בדיקה האם הלקוח קיים במערכת-Dealen
    public List<Customer> CheckIfExits(string mail, string password)
    {
        SqlConnection con = null;
        List<Customer> customers = new List<Customer>();

        try
        {
            con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

            String selectSTR = "select cust_id,[cust_name],cust_address,cust_phone,birthdate,cust_mail, password,[image] from Customer_2021 where cust_mail = '" + mail.ToString()+ "' and [password] = '" +password.ToString() + "'";
            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

            while (dr.Read())
            {   // Read till the end of the data into a row
                Customer c = new Customer();
                
                    c.Cust_id = Convert.ToInt32(dr["cust_id"]);
                    c.Cust_name = (string)dr["cust_name"];
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

                sb.AppendFormat(" SELECT dealInbus_2021.id,dealInbus_2021.business_id, Businesses_2021.name, dealInbus_2021.startime, dealInbus_2021.endtime, dealInbus_2021.discount, Category_2021.name AS catgeory_name, Deal_2021.image, Deal_2021.description, Deal_2021.name AS deal_name, Deal_2021.cat_id as cat_id  FROM Businesses_2021 INNER JOIN dealInbus_2021 ON Businesses_2021.id = dealInbus_2021.business_id INNER JOIN Deal_2021 ON dealInbus_2021.deal_id = Deal_2021.id INNER JOIN Category_2021 ON Deal_2021.cat_id = Category_2021.id");
                selectSTR = sb.ToString(); 
        

            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            while (dr.Read())
            {   // Read till the end of the data into a row
                Deal d = new Deal();
                d.Id = Convert.ToInt32(dr["id"]);
                d.Name = (string)dr["deal_name"];
                d.Business_Name = (string)dr["name"];
                d.Business_id= Convert.ToInt32(dr["business_id"]);
                d.Category = (string)dr["catgeory_name"];
                d.Cat_id= Convert.ToInt32(dr["cat_id"]);
                d.Startime = Convert.ToDateTime(dr["startime"]);
                d.Endtime = Convert.ToDateTime(dr["endtime"]);
                d.Image = (string)dr["image"];
                d.Description = (string)dr["description"];
                d.Discount = Convert.ToDouble(dr["discount"])*100;

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

            sb.AppendFormat("SELECT dealInbus_2021.id, Businesses_2021.name, dealInbus_2021.business_id as business_id,dealInbus_2021.startime, dealInbus_2021.endtime, dealInbus_2021.discount, Category_2021.name AS catgeory_name, Deal_2021.image, Deal_2021.description, Deal_2021.name AS deal_name, Deal_2021.cat_id as cat_id FROM Businesses_2021 INNER JOIN dealInbus_2021 ON Businesses_2021.id = dealInbus_2021.business_id INNER JOIN Deal_2021 ON dealInbus_2021.deal_id = Deal_2021.id INNER JOIN Category_2021 ON Deal_2021.cat_id = Category_2021.id where Deal_2021.cat_id=" + cat_id);
            selectSTR = sb.ToString();


            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            while (dr.Read())
            {   // Read till the end of the data into a row
                Deal d = new Deal();
                d.Id = Convert.ToInt32(dr["id"]);
                d.Name = (string)dr["deal_name"];
                d.Business_Name = (string)dr["name"];
                d.Business_id = Convert.ToInt32(dr["business_id"]);
                d.Category = (string)dr["catgeory_name"];
                d.Cat_id = Convert.ToInt32(dr["cat_id"]);
                d.Startime = Convert.ToDateTime(dr["startime"]);
                d.Endtime = Convert.ToDateTime(dr["endtime"]);
                d.Image = (string)dr["image"];
                d.Description = (string)dr["description"];
                d.Discount = Convert.ToDouble(dr["discount"])*100;
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

    //Get all resturant Data for unknown user
    public List<Businesses> getBusinesses(string category = null)
    {
        SqlConnection con = null;
        List<Businesses> bList = new List<Businesses>();
        string selectSTR = null;
        try
        {
            con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file
            if (category == null)
            {
                StringBuilder sb = new StringBuilder();

                sb.AppendFormat("select Re.id, Re.[name], Re.user_rating, Re.category, Re.price_range, Re.[location],Re.phone_numbers,Re.featured_image " +
                        "from Restaurants_2021 as Re " +
                        "inner join Attribute_rest_2021 as AtR on Re.id = AtR.Id_rest " +
                        "inner join Attribute_2021 as Att on AtR.Id_attribute = Att.Id " +
                        "group by Re.id, Att.[name],Re.[name], Re.user_rating, Re.category, Re.price_range, Re.[location],Re.phone_numbers,Re.featured_image " +
                        "order by Re.price_range,Re.user_rating DESC,case when Att.[name] = 'Wifi' then 0 else 1 end ");
                selectSTR = sb.ToString();
            }
            else
            {
                StringBuilder sb = new StringBuilder();

                sb.AppendFormat("select Re.id, Re.[name], Re.user_rating, Re.category, Re.price_range, Re.[location],Re.phone_numbers,Re.featured_image " +
                        "from Restaurants_2021 as Re " +
                        "inner join Attribute_rest_2021 as AtR on Re.id = AtR.Id_rest " +
                        "inner join Attribute_2021 as Att on AtR.Id_attribute = Att.Id " +
                        "where category like '%{0}%' and Re.id not in( select id_rest from campaingn_2021 where status= 'True') " +
                        "group by Re.id, Att.[name],Re.[name], Re.user_rating, Re.category, Re.price_range, Re.[location],Re.phone_numbers,Re.featured_image " +
                        "order by Re.price_range,Re.user_rating DESC,case when Att.[name] = 'Wifi' then 0 else 1 end ", category);
                selectSTR = sb.ToString();
            }


            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            List<Businesses> Unique_list = new List<Businesses>();
            List<int> Id_list = new List<int>();
            while (dr.Read())
            {   // Read till the end of the data into a row
                Businesses B = new Businesses();
                B.Id = Convert.ToInt32(dr["id"]);
                B.Name = (string)dr["name"];
                B.User_rating = Convert.ToDouble(dr["user_rating"]);
                B.Category = (string)dr["category"];
                B.Price_range = Convert.ToInt32(dr["price_range"]);
                B.Location = (string)dr["location"];
                B.Phone_numbers = (string)dr["phone_numbers"];
                B.Featured_image = (string)dr["featured_image"];

                bList.Add(B);


            }
            //filter list only unique items
            foreach (Businesses value in bList)
            {
                if (!Id_list.Contains(value.Id))
                { 

                    Id_list.Add(value.Id);
                    Unique_list.Add(value);
                }
            }

            return Unique_list;
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


    //Get Promot Resturant for unknown user getPromot
    public List<Businesses> getPromot(string category)
    {
        SqlConnection con = null;
        List<Businesses> bList = new List<Businesses>();
        string selectSTR = null;
        try
        {
            con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file
          
                StringBuilder sb = new StringBuilder();

                sb.AppendFormat("select Re.id, Re.[name], Re.user_rating, Re.category, Re.price_range, Re.[location],Re.phone_numbers,Re.featured_image "+
                                "from Restaurants_2021 as Re " +
                                "inner join Attribute_rest_2021 as AtR on Re.id = AtR.Id_rest " +
                                "inner join Attribute_2021 as Att on AtR.Id_attribute = Att.Id "+
                                "inner join campaingn_2021 as ca on Re.id = ca.id_rest " +
                                "where category like '%{0}%' and ca.[status] = 1 " +
                                "group by  Re.id, Att.[name],Re.[name], Re.user_rating, Re.category, Re.price_range, Re.[location],Re.phone_numbers,Re.featured_image " +
                                "order by Re.price_range,Re.user_rating DESC,case when Att.[name] = 'Wifi' then 0 else 1 end ", category);
                selectSTR = sb.ToString();
            


            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            List<Businesses> Unique_list = new List<Businesses>();
            List<int> Id_list = new List<int>();
            while (dr.Read())
            {  
                Businesses B = new Businesses();
                B.Id = Convert.ToInt32(dr["id"]);
                B.Name = (string)dr["name"];
                B.User_rating = Convert.ToDouble(dr["user_rating"]);
                B.Category = (string)dr["category"];
                B.Price_range = Convert.ToInt32(dr["price_range"]);
                B.Location = (string)dr["location"];
                B.Phone_numbers = (string)dr["phone_numbers"];
                B.Featured_image = (string)dr["featured_image"];

                bList.Add(B);


            }
            //filter list only unique items
            foreach (Businesses value in bList)
            {
                if (!Id_list.Contains(value.Id))
                {
                    Id_list.Add(value.Id);
                    Unique_list.Add(value);
                }
            }

            return Unique_list;
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
    public List<Businesses> getActive(string category)
    {
        SqlConnection con = null;
        List<Businesses> bList = new List<Businesses>();
        string selectSTR = null;
        try
        {
            con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

            StringBuilder sb = new StringBuilder();

            sb.AppendFormat("select * from Restaurants_2021 where category like'%" + category+"%' and id not in( select id_rest from campaingn_2021 where status= 'True')");
            selectSTR = sb.ToString();



            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            List<Businesses> Unique_list = new List<Businesses>();
            List<int> Id_list = new List<int>();
            while (dr.Read())
            {
                Businesses B = new Businesses();
                B.Id = Convert.ToInt32(dr["id"]);
                B.Name = (string)dr["name"];
                B.User_rating = Convert.ToDouble(dr["user_rating"]);
                B.Category = (string)dr["category"];
                B.Price_range = Convert.ToInt32(dr["price_range"]);
                B.Location = (string)dr["location"];
                B.Phone_numbers = (string)dr["phone_numbers"];
                B.Featured_image = (string)dr["featured_image"];

                bList.Add(B);


            }
            //filter list only unique items
            foreach (Businesses value in bList)
            {
                if (!Id_list.Contains(value.Id))
                {
                    Id_list.Add(value.Id);
                    Unique_list.Add(value);
                }
            }

            return Unique_list;
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

    //Get all Campaingns Data
    //public List<Campaign> getcampaingns()
    //{
    //    SqlConnection con = null;
    //    List<Campaign> campaignsList = new List<Campaign>();

    //    try
    //    {
    //        con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

    //        String selectSTR = "select ca.id,id_rest,[name],budget,Balance,num_clicks,num_views,[status] from campaingn_2021 as ca inner join Restaurants_2021 as re on ca.id_rest = re.id where[status] = 'true'";
    //        SqlCommand cmd = new SqlCommand(selectSTR, con);

    //        // get a reader
    //        SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

    //        while (dr.Read())
    //        {   // Read till the end of the data into a row
    //            Campaign C = new Campaign();

    //            C.Id = Convert.ToInt32(dr["id"]);
    //            C.Id_rest = Convert.ToInt32(dr["id_rest"]);
    //            C.Rest_name = (string)(dr["name"]);
    //            C.Budget = Convert.ToInt32(dr["budget"]);
    //            C.Balance = Convert.ToDouble((dr["balance"]));
    //            C.Num_clicks = Convert.ToInt32(dr["num_clicks"]);
    //            C.Num_views = Convert.ToInt32(dr["num_views"]);
    //            C.Status = Convert.ToBoolean(dr["status"]);
    //            campaignsList.Add(C);
    //        }

    //        return campaignsList;
    //    }
    //    catch (Exception ex)
    //    {
    //        // write to log
    //        throw (ex);
    //    }
    //    finally
    //    {
    //        if (con != null)
    //        {
    //            con.Close();
    //        }

    //    }

    //}

    //Get attribute by customer id - getattribute_In_Custs
    //public List<Attribute_In_cust> getattribute_In_Custs(int id)
    //{
    //    SqlConnection con = null;
    //    List<Attribute_In_cust> attribute_In_cust = new List<Attribute_In_cust>();

    //    try
    //    {
    //        con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file

    //        String selectSTR = "select Id_attribute from Attribute_Cust_2021 where id_cust = " + id.ToString();
    //        SqlCommand cmd = new SqlCommand(selectSTR, con);

    //        // get a reader
    //        SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

    //        while (dr.Read())
    //        {   // Read till the end of the data into a row
    //            Attribute_In_cust C = new Attribute_In_cust();

    //            C.Id_att = Convert.ToInt32(dr["Id_attribute"]);
    //            attribute_In_cust.Add(C);
    //        }

    //        return attribute_In_cust;
    //    }
    //    catch (Exception ex)
    //    {
    //        // write to log
    //        throw (ex);
    //    }
    //    finally
    //    {
    //        if (con != null)
    //        {
    //            con.Close();
    //        }

    //    }

    //}

    ////Get all resturant data for relevant user getBusinessesByUser
    //public List<Businesses> getBusinessesByUser(int[] att_id, string category = null)
    //{
    //    SqlConnection con = null;
    //    List<Businesses> bList = new List<Businesses>();
    //    string selectSTR = null;
    //    string select_att_case = "";
    //    foreach (int element in att_id)
    //    {
    //        select_att_case += "case when Att.Id = " + element.ToString() + " then 0 else 1 end,";
    //    }

    //    select_att_case = select_att_case.Remove(select_att_case.Length - 1);
    //    try
    //    {
    //        con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file
    //        if (category == null)
    //        {
    //            StringBuilder sb = new StringBuilder();

    //            sb.AppendFormat("select Re.id, Re.[name], Re.user_rating, Re.category, Re.price_range, Re.[location],Re.phone_numbers,Re.featured_image " +
    //                    "from Restaurants_2021 as Re " +
    //                    "inner join Attribute_rest_2021 as AtR on Re.id = AtR.Id_rest " +
    //                    "inner join Attribute_2021 as Att on AtR.Id_attribute = Att.Id " +
    //                    "group by  Re.id, Att.Id,Re.[name], Re.user_rating, Re.category, Re.price_range, Re.[location],Re.phone_numbers,Re.featured_image " +
    //                    "order by {0}" , select_att_case);
    //            selectSTR = sb.ToString();
    //        }
    //        else
    //        {
    //            StringBuilder sb = new StringBuilder();

    //            sb.AppendFormat("select Re.id, Re.[name], Re.user_rating, Re.category, Re.price_range, Re.[location],Re.phone_numbers,Re.featured_image " +
    //                    "from Restaurants_2021 as Re " +
    //                    "inner join Attribute_rest_2021 as AtR on Re.id = AtR.Id_rest " +
    //                    "inner join Attribute_2021 as Att on AtR.Id_attribute = Att.Id " +
    //                    "where category like '%{0}%' and Re.id not in( select id_rest from campaingn_2021 where status= 'True') " +
    //                    "group by  Re.id, Att.Id,Re.[name], Re.user_rating, Re.category, Re.price_range, Re.[location],Re.phone_numbers,Re.featured_image " +
    //                    "order by {1}", category, select_att_case);
    //            selectSTR = sb.ToString();
    //        }


    //        SqlCommand cmd = new SqlCommand(selectSTR, con);

    //        // get a reader
    //        SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
    //        List<Businesses> Unique_list = new List<Businesses>();
    //        List<int> Id_list = new List<int>();
    //        while (dr.Read())
    //        {   // Read till the end of the data into a row
    //            Businesses B = new Businesses();
    //            B.Id = Convert.ToInt32(dr["id"]);
    //            B.Name = (string)dr["name"];
    //            B.User_rating = Convert.ToDouble(dr["user_rating"]);
    //            B.Category = (string)dr["category"];
    //            B.Price_range = Convert.ToInt32(dr["price_range"]);
    //            B.Location = (string)dr["location"];
    //            B.Phone_numbers = (string)dr["phone_numbers"];
    //            B.Featured_image = (string)dr["featured_image"];

    //            bList.Add(B);


    //        }
    //        //filter list only unique items
    //        foreach (Businesses value in bList)
    //        {
    //            if (!Id_list.Contains(value.Id))
    //            {
    //                Id_list.Add(value.Id);
    //                Unique_list.Add(value);
    //            }
    //        }

    //        return Unique_list;
    //    }
    //    catch (Exception ex)
    //    {
    //        // write to log
    //        throw (ex);
    //    }
    //    finally
    //    {
    //        if (con != null)
    //        {
    //            con.Close();
    //        }

    //    }

    //}

    //Get Promot Resturant for user getPromotBusinessesByUser
    public List<Businesses> getPromotBusinessesByUser(int[] att_id, string category)
    {
        SqlConnection con = null;
        List<Businesses> bList = new List<Businesses>();
        string selectSTR = null;
        string select_att_case = "";
        foreach (int element in att_id)
        {
            select_att_case += "case when Att.Id = " + element.ToString() + " then 0 else 1 end,";
        }

        select_att_case = select_att_case.Remove(select_att_case.Length - 1);
        try
        {
            con = connect("DBConnectionString"); // create a connection to the database using the connection String defined in the web config file
            
                StringBuilder sb = new StringBuilder();

                sb.AppendFormat("select Re.id, Re.[name], Re.user_rating, Re.category, Re.price_range, Re.[location],Re.phone_numbers,Re.featured_image " +
                        "from Restaurants_2021 as Re " +
                        "inner join Attribute_rest_2021 as AtR on Re.id = AtR.Id_rest " +
                        "inner join Attribute_2021 as Att on AtR.Id_attribute = Att.Id " +
                        "inner join campaingn_2021 as ca on Re.id = ca.id_rest " +
                        "where category like '%{0}%' and ca.[status] = 1 " +
                        "group by Re.id, Att.Id,Re.[name], Re.user_rating, Re.category, Re.price_range, Re.[location],Re.phone_numbers,Re.featured_image " +
                        "order by {1}", category, select_att_case);
                selectSTR = sb.ToString();
         


            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end
            List<Businesses> Unique_list = new List<Businesses>();
            List<int> Id_list = new List<int>();
            while (dr.Read())
            {   // Read till the end of the data into a row
                Businesses B = new Businesses();
                B.Id = Convert.ToInt32(dr["id"]);
                B.Name = (string)dr["name"];
                B.User_rating = Convert.ToDouble(dr["user_rating"]);
                B.Category = (string)dr["category"];
                B.Price_range = Convert.ToInt32(dr["price_range"]);
                B.Location = (string)dr["location"];
                B.Phone_numbers = (string)dr["phone_numbers"];
                B.Featured_image = (string)dr["featured_image"];

                bList.Add(B);


            }
            //filter list only unique items
            foreach (Businesses value in bList)
            {
                if (!Id_list.Contains(value.Id))
                {
                    Id_list.Add(value.Id);
                    Unique_list.Add(value);
                }
            }

            return Unique_list;
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


    //Campaign was clicked- update campaign
    public int CampaignClick(int id)
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

        String cStr = BuildComm_AfterClicked(id);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = Convert.ToInt32(cmd.ExecuteScalar());// execute the command
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
    private String BuildComm_AfterClicked(int id)
    {
        String command;
        command = "UPDATE campaingn_2021 SET num_clicks = num_clicks + 1,balance = balance - 0.5 WHERE id_rest = " + id.ToString() + " " +
                  "select balance from campaingn_2021 where id_rest = " + id.ToString();
        return command;
    }


    //Campaign was Viewd- update campaign
    public int CampaignView(List<Businesses> blist)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("DBConnectionString"); // create the connection
        }
        catch (Exception ex)
        {
            //write to log
            throw (ex);
        }

        String cStr = BuildComm_AfterView(blist);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            //write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                //close the db connection
                con.Close();
            }
        }

    }
    //--------------------------------------------------------------------
    private String BuildComm_AfterView(List<Businesses> blist)
    {
       
      
        foreach (Businesses business in blist)
        {
           command += " UPDATE campaingn_2021 SET num_views = num_views + 1,balance = balance - 0.1 WHERE id_rest = " + business.Id.ToString();
        }


        return command;
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

