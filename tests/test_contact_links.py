from html.parser import HTMLParser
from pathlib import Path
import unittest


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = {}

    def handle_starttag(self, tag, attrs):
        if tag == "a":
            attrs = dict(attrs)
            self.links[attrs.get("href")] = attrs


class ContactLinkNames(unittest.TestCase):
    def test_icon_only_contacts_are_named_without_changing_their_targets(self):
        parser = Links()
        parser.feed((Path(__file__).resolve().parents[1] / "index.html").read_text())
        for destination, name in [
            ("https://www.linkedin.com/in/hou-chi-chan-4570001b3/", "LinkedIn"),
            ("mailto:hchan7235@bths.edu", "Email"),
            ("https://github.com/SciencePotato", "GitHub"),
            ("mailto:TacoScience#2133", "Discord contact"),
        ]:
            with self.subTest(destination=destination):
                self.assertEqual(parser.links[destination].get("aria-label"), name)


if __name__ == "__main__":
    unittest.main()
