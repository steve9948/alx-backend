#!/usr/bin/python3
""" class BasicCache that inherits
from BaseCaching and is a caching system"""
BaseCaching = __import__("base_caching").BaseCaching


class BasicCache(BaseCaching):
    """Basic cache class"""

    def put(self, key, item):
        """takes a key and an item as arguments."""
        if key and item:
            self.cache_data[key] = item

    def get(self, key):
        """Return the value linked"""
        return self.cache_data.get(key)
