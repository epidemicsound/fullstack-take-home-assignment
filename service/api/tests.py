from django.test import TestCase


class FirstTests(TestCase):

    def test_first_test(self):
        """
        first test
        """
        var1 = False
        self.assertIs(var1, True)

# I would have liked to add some tests here, but I couldn't get them to run. :(
# django.db.utils.OperationalError: could not translate host name "db" to address: Unknown host
# tried fiddling around with settings.py but couldn't figure it out.

