import java.io.*;
import java_cup.runtime.Symbol;

public class Main {
	public static void main(String[] args) {
		try {
			Reader reader;
			if (args.length > 0) {
				reader = new BufferedReader(new FileReader(args[0]));
				System.out.println("Reading from file: " + args[0]);
			} else {
				String sample = "if x then (y) else z end if";
				reader = new StringReader(sample);
				System.out.println("No file provided. Using sample: " + sample);
			}

			Lexer lexer = new Lexer(reader);
			parser p = new parser(lexer);
			Object result = p.parse().value;
			System.out.println("Parse success. Result: " + result);
		} catch (Exception e) {
			System.err.println("Parse failed: " + e.getMessage());
			e.printStackTrace();
			System.exit(1);
		}
	}

}
