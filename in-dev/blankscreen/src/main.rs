use css_color_parser::Color as CssColor;
use sdl2::event::Event;
use sdl2::keyboard::Keycode;
use sdl2::pixels::Color;
use std::time::Duration;

fn main() -> Result<(), String> {
    let sdl_context = sdl2::init()?;
    let video_subsystem = sdl_context.video()?;

    let window = video_subsystem
        .window("rust-sdl2 demo", 800, 600)
        //.fullscreen_desktop()
        //.position_centered()
        .resizable()
        //.maximized()
        .build()
        .expect("could not initialize video subsystem");

    let mut canvas = window
        .into_canvas()
        .build()
        .expect("could not make a canvas");

    let mut args: Vec<_> = std::env::args().collect();
    if args.len() > 1 {
        if args[1] == "youtube" {
            args[1] = String::from("#f9f9f9");
        }
    } else {
        args.push(String::from("white"));
    }
    let c = args[1]
        .parse::<CssColor>()
        .map_err(|_| ("could not parse color"))?;
    canvas.set_draw_color(Color::RGB(c.r, c.g, c.b));

    canvas.clear();
    canvas.present();
    let mut event_pump = sdl_context.event_pump()?;
    //let mut i = 0;
    'running: loop {
        //i = (i + 1) % 255;
        //canvas.set_draw_color(Color::RGB(i, 64, 255 - i));
        canvas.clear();
        for event in event_pump.poll_iter() {
            match event {
                Event::Quit { .. }
                | Event::KeyDown {
                    keycode: Some(Keycode::Escape),
                    ..
                } => {
                    break 'running;
                }
                _ => {}
            }
        }
        // The rest of the game loop goes here...

        canvas.present();
        ::std::thread::sleep(Duration::new(0, 1_000_000_000u32 / 60));
    }

    Ok(())
}
