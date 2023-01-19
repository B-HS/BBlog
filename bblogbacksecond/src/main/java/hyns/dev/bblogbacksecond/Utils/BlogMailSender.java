package hyns.dev.bblogbacksecond.Utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class BlogMailSender {
	private final JavaMailSender mailSender;

	@Value("${spring.mail.username}")
	private String FROM_ADDRESS;

	@Value("${spring.mail.host}")
	private String host;

	@Value("${spring.mail.port}")
	private String port;

	public void send(String mailAdress, String title, String context) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(mailAdress);
		message.setFrom(FROM_ADDRESS);
		message.setSubject(title);
		message.setText(context);
		mailSender.send(message);
	}
}
