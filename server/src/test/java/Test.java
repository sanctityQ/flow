import java.io.File;
import java.net.MalformedURLException;

/**
 * Created by ChengQi on 6/17/16.
 */
public class Test {

  public static void main(String args[]) throws MalformedURLException {
    File file = new File("/Users/ChengQi/workspace/flow/client/client/build/bundle.js");
    System.out.println(file.exists());
    System.out.println(file.toURI().toURL());
  }

}
