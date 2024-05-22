#!/usr/bin/python3
"""
Module for implementing a simple LRU (Least Recently Used) caching system.
This module contains a class `LRUCache` which inherits from `BaseCaching`
and provides methods to add and retrieve items
from the cache with LRU eviction policy.
"""

BaseCaching = __import__("base_caching").BaseCaching


class LRUCache(BaseCaching):
    """
    LRUCache class:
    Implements a caching system with a Least
    Recently Used (LRU) eviction policy.
    Inherits from BaseCaching and overrides the put
    and get methods to manage cache entries.
    """

    def __init__(self):
        """
        Initialize the LRUCache class.
        Sets up the parent class and initializes
        an order list to keep track of usage order.
        """
        super().__init__()
        self.order = []

    def put(self, key, item):
        """
        Add an item to the cache with the specified key.
        If the cache exceeds its maximum size,
        the least recently used item will be removed.

        Args:
            key (str): The key under which the item will be stored.
            item (any): The item to be stored in the cache.

        Returns:
            None
        """
        if key and item:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                removed = self.order.pop(0)  # Remove the first item
                self.cache_data.pop(removed)
                print("DISCARD: {}".format(removed))
            self.cache_data[key] = item
            self.order.append(key)
            # Ensure the key is the most recently used
            if key in self.order:
                self.order.remove(key)
            self.order.append(key)

    def get(self, key):
        """
        Retrieve an item from the cache by its key.
        If the key is found, the item becomes the most recently used.

        Args:
            key (str): The key of the item to retrieve.

        Returns:
            any: The item associated with the key, or None if
            the key is not found.
        """
        if key in self.cache_data:
            # Move the key to the end to mark it as most recently used
            self.order.remove(key)
            self.order.append(key)
            return self.cache_data.get(key)
        return None
