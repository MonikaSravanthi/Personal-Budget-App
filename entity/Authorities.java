package com.springlearning.budgetapp.entity;

import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Reference;


@Entity
@Table(name="authorities")
public class Authorities {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "username", referencedColumnName = "username", nullable = false)
    private Users user;

    @Column(name="authority")
    private String authority;

    public Authorities() {}

  public Authorities(Long id, Users user, String authority) {
        this.id = id;
        this.user = user;

        this.authority = authority;

  }
  public Long getId() {
        return id;
  }
  public void setId(Long id) {
        this.id = id;
  }
  public Users getUser() {
        return user;
  }
  public void setUser(Users user) {
        this.user = user;
  }
public String getAuthority() {
        return authority;
  }
  public void setAuthority(String authority) {
        this.authority = authority;
  }


}
