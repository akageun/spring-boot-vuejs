package kr.geun.o.web;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * HomeController
 *
 * @author akageun
 * @since 2019-09-18
 */
@Slf4j
@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        log.info("test");
        return "index";
    }
}
