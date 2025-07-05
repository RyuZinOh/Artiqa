use std::io::{self, Write};
pub fn run_admin_panel(){
    loop{
        println!("\n==ADMN PANEL==");
        println!("1. Review Artist Requests");
        println!("2. Manage Wekkly Competition");
        println!("3. Weekly Winners");
        println!("4. Manage Users");
        println!("5. Moderarte Arts");
        println!("6. Exit");

        let choice = get_input("select an option:");

        match choice.trim(){
            // "1"=> 
            "2"=> manage_weekly_compeition(),
            "3"=> handle_weekly_winners(),
            "4"=>  manage_users(),
            "5" => moderate_art(),
            "6"=>{
                println!("Exiting admin panel...");
                break;
            } 
            _ => println!("Invalid option")
        }


    }
}



//managing weely competitoin
fn manage_weekly_compeition(){
    println!("\n=== Weekly Art Competition===");
    println!("\n1. Create Competition");
    println!("2. View Current Projct");
    println!("3. List Past Projects");
    println!("4. Return")
}



//viewing current votes, select winner
fn  handle_weekly_winners(){    
    println!("\n=== Weekly Winners ===");
    println!("\n1. View Last Week's Winner");
    println!("2. Return")
}


//managing user
fn manage_users(){
    println!("\n=== User Management ===");
    println!("\n1. List All Users");    
    println!("2. Ban/UnBan Users");
    println!("3. Search Users & Modify");
    println!("4. Return");
}


//moderating art
fn moderate_art(){
    println!("\n=== Arts Management ===");
    println!("1. View All");
    println!("2. Search / Moderate");
    println!("3. Return");
 

    
}

fn get_input(prompt: &str)->String{
    let mut input = String::new();
    print!("{}", prompt);
    io::stdout().flush().unwrap();
    io::stdin().read_line(&mut input).expect("failed to read line");
    input

}