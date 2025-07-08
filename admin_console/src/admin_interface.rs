use std::io::{self, Write};
pub fn run_admin_panel(){
    loop{
        print!("\x1B[2J\x1B[1;1H"); // clearing temrinal above
        println!("\n===ADMN PANEL===");
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
    loop{
    print!("\x1B[2J\x1B[1;1H");
    println!("\n=== Weekly Art Competition===");
    println!("\n1. Create Competition");
    println!("2. View Current Projct");
    println!("3. List Past Projects");
    println!("4. Return");

    let choice = get_input("select an option:");

    match choice.trim(){
        _=> println!("Invalid Option.")
    }


    pause();

    }
}






//viewing current votes, select winner
fn  handle_weekly_winners(){   
    loop{
    print!("\x1B[2J\x1B[1;1H");
    println!("\n=== Weekly Winners ===");
    println!("\n1. View Last Week's Winner");
    println!("2. Return");

    let choice = get_input("select an option:");
    
    match choice.trim(){
        _=> println!("Invalid Option.")
    }


    pause();
    } 

}


//managing user
fn manage_users(){
    loop {
        
    print!("\x1B[2J\x1B[1;1H");
    println!("\n=== User Management ===");
    println!("\n1. List All Users");    
    println!("2. Ban/UnBan Users");
    println!("3. Search Users & Modify");
    println!("4. Return");


    let choice = get_input("select an option:");
    
    match choice.trim(){
        _=> println!("Invalid Option.")
    }


    pause();
    }
}


//moderating art
fn moderate_art(){
    loop{
    print!("\x1B[2J\x1B[1;1H");
    println!("\n=== Arts Management ===");
    println!("1. View All");
    println!("2. Search / Moderate");
    println!("3. Return");
    
 
    let choice = get_input("select an option:");
    
    match choice.trim(){
        _=> println!("Invalid Option.")
    }


    pause();
    
    }
    
}

fn get_input(prompt: &str)->String{
    let mut input = String::new();
    print!("{}", prompt);
    io::stdout().flush().unwrap();
    io::stdin().read_line(&mut input).expect("failed to read line");
    input

}




//pausing

fn pause(){
    println!("\n Press Enter to continue...");
    let mut dummy = String::new();
    let _ = std::io::stdin().read_line(&mut  dummy);
}