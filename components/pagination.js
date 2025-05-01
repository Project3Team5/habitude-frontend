import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Pagination = ({ currentPage, totalItems, pageSize, onPageChange, scrollRef }) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const pagination = [];

  // First page and ellipsis
  if (currentPage > 2) {
    pagination.push(renderPageButton(0));
    if (currentPage > 3) pagination.push(<Text key="start-ellipsis" style={styles.ellipsis}>...</Text>);
  }

  // Nearby pages
  for (let i = Math.max(0, currentPage - 2); i <= Math.min(totalPages - 1, currentPage + 2); i++) {
    pagination.push(renderPageButton(i));
  }

  // Ellipsis and last page
  if (currentPage < totalPages - 3) {
    if (currentPage < totalPages - 4) pagination.push(<Text key="end-ellipsis" style={styles.ellipsis}>...</Text>);
    pagination.push(renderPageButton(totalPages - 1));
  }

  function renderPageButton(pageIndex) {
    return (
      <TouchableOpacity
        key={pageIndex}
        onPress={() => {
          onPageChange(pageIndex);
          scrollRef?.current?.scrollTo({ y: 0, animated: true });
        }}
      >
        <Text style={[styles.pageButton, currentPage === pageIndex && styles.activePage]}>
          {pageIndex + 1}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.paginationWrapper}>
      <TouchableOpacity
        style={[styles.navButton, currentPage === 0 && styles.disabledButton]}
        onPress={() => {
          if (currentPage > 0) {
            onPageChange(currentPage - 1);
            scrollRef?.current?.scrollTo({ y: 0, animated: true });
          }
        }}
        disabled={currentPage === 0}
      >
        <Text style={styles.navButtonText}>‹ Prev</Text>
      </TouchableOpacity>

      <View style={styles.pageList}>{pagination}</View>

      <TouchableOpacity
        style={[
          styles.navButton,
          (currentPage + 1) * pageSize >= totalItems && styles.disabledButton
        ]}
        onPress={() => {
          if ((currentPage + 1) * pageSize < totalItems) {
            onPageChange(currentPage + 1);
            scrollRef?.current?.scrollTo({ y: 0, animated: true });
          }
        }}
        disabled={(currentPage + 1) * pageSize >= totalItems}
      >
        <Text style={styles.navButtonText}>Next ›</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 30,
    gap: 10,
  },
  navButton: {
    backgroundColor: "#0D1B3E",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  navButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  pageList: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  pageButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: "#ccc",
    fontSize: 14,
  },
  activePage: {
    color: "#00d0ff",
    borderBottomWidth: 2,
    borderBottomColor: "#00d0ff",
  },
  ellipsis: {
    color: "#aaa",
    fontSize: 16,
  },
});

export default Pagination;